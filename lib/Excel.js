/* テーブルのヘッダー列を生成するコンポーネント */
const Excel = React.createClass({
  // displayNameプロパティを設定することでコンポーネントの名称をReactに伝えることができる
  displayName: 'Excel',
  // propTypesプロパティを定義することでコンポーネントが受け取るプロパティの型を規定する
  propTypes: {
    // React.PropTypes.arrayOf(React.Proptypes.type)
    // プロパティを配列に指定。引数で要素の型も指定。
    headers: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    initialData: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.string
      )
    )
  },
  // 表の初期状態(検索前)を保持しておくフィールド
  _preSearchData: null,
  // stateを記録する配列
  _log: [],
  // undo, redo用のstateのインデックス
  _logIdx: 0,
  // stateの初期値をinitialDataに設定
  getInitialState: function () {
    return {
      // 表の初期データ
      data: this.props.initialData,
      // 並べ替えの基準となっている列のインデックス
      sortby: null,
      // 昇順か降順かを表す真偽値
      descending: false,
      // row: 行番号, cell: 列番号
      edit: null,
      // 検索機能のON/OFFを管理する真偽値
      search: false
    }
  },
  // ===============リプレイ機能のためのメソッド群===============
  componentDidMount: function () {
    document.onkeydown = function (e) {
      // Alt + Shift + Rでリプレイ実行
      if (e.altKey && e.shiftKey && e.keyCode === 82) {
        this._reply();
      }
      // Alt + z でアンドゥ
      if (e.altKey && e.keyCode === 90) {
        this._undo();
      }
      // Alt + Shift + zでリドゥ
      if (e.altKey && e.shiftKey && e.keyCode === 88) {
        this._redo();
      }
    }.bind(this);
  },
  _reply: function () {
    if (this._log.length === 0) {
      console.warn('stateが記録されていません');
      return;
    }
    let idx = -1;
    const interval = setInterval(function () {
      idx++;
      if (idx === this._log.length - 1) {
        clearInterval(interval);
      }
      this.setState(this._log[idx]);
    }.bind(this), 1000);
  },
  _undo: function () {
    if (this._logIdx === 0) {
      console.warn('これより前のstateはありません');
      return;
    }
    this.setState(this._log[this._logIdx - 1]);
    this._logIdx--;
  },
  _redo: function () {
    if (this._log.length <= this._logIdx) {
      console.warn('これより後のstateはありません');
      return;
    }
    this._logIdx++;
    this.setState(this._log[this._logIdx - 1]);
  },
  // ===============ヘッダーをクリックしてソートするメソッド===============
  _sort: function (e) {
    console.log('----------- start _sort()----------------');
    // tableに対してcellIndexプロパティを指定すると、そのth(td)の行内における添字を取得できる(ReactではなくDOMの機能)
    const column = e.target.cellIndex;
    // 昇順か降順かを決定する
    let descending = false;
    // 1.クリックされた列が現在の基準の列と同じ
    if (column === this.state.sortby) {
      // 2.現在昇順でソートされている
      if (!this.state.descending) {
        // 降順に変更する
        descending = true;
      }
    }
    // 並べ替えの元となるデータを現在のstateからコピーする(Array.from(配列)で配列のシャローコピーを取得)
    const data = Array.from(this.state.data);
    // 配列のコピーをArray.sort()で行う
    data.sort(function (a, b) {
      // 文字コードが若いほうが先にくるソート
      return descending
        ? (a[column] > b[column] ? 1 : -1)
        : (a[column] < b[column] ? 1 : -1);
    });
    // ソートしたdataを_logSetStateで更新する
    this._logSetState({
      data: data,
      sortby: column,
      descending: descending
    });
    console.log('----------- end   _sort()----------------');
  },
  // ===============セルをダブルクリックしたとき、そのセルの位置を記憶するメソッド===============
  _showEditor: function (e) {
    console.log('----------- start _showEditor()----------------');
    // stateにeditプロパティを追加する
    this._logSetState({
      edit: {
        // 各行にdata-*(カスタムデータ属性)を追加し、datasetから行番号を取得できるようにする
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex
      }
    });
    console.log('----------- end   _showEditor()----------------');
  },
  // ===============セルの入力フィールドでEnterしたときのメソッド===============
  _save: function (e) {
    console.log('----------- start _save()----------------');
    // formのsubmit処理(デフォルトで発生する)を無効化する
    e.preventDefault();
    // form要素の子(input)を取得する
    const input = e.target.firstChild;
    // 現在の表データのシャローコピーを取得する
    const data = Array.from(this.state.data);
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    // stateを更新する
    this._logSetState({
      data: data,
      // イベントが終わるので保持していたセルの情報をクリアする
      edit: null
    });
    console.log('----------- end   _save()----------------');
  },
  // ===============検索ボタンの押下時に検索機能のON/OFFを切り替えるメソッド===============
  _toggleSearch: function () {
    console.log('----------- start _toggleSearch()----------------');
    if (this.state.search) {
      // 検索機能をOFFにするとき、表データを保存しておいたものに戻す
      this._logSetState({
        search: false,
        data: this._preSearchData
      });
      this._preSearchData = null;
    } else {
      // 検索機能をONにするとき、表データを保存しておく
      this._preSearchData = this.state.data;
      this._logSetState({
        search: true
      });
    }
    console.log('----------- end   _toggleSearch()----------------');
  },
  // ===============検索を実行するメソッド===============
  _search: function (e) {
    console.log('----------- start _search()----------------');
    // 入力文字列を取得
    const needle = e.target.value.toLowerCase();
    // 検索文字列が空文字だったとき
    if (!needle) {
      // 表データをもとに戻す
      this._logSetState({ data: this._preSearchData });
      return;
    }
    // 入力欄の列インデックスを取得
    const idx = e.target.dataset.idx;
    // 保存してある元データの参照から検索結果を取得
    const searchdata = this._preSearchData.filter(function (row) {
      // 行データを文字列にしてその中に検索文字列が見つかるか否か
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this._logSetState({ data: searchdata });
    console.log('----------- end   _search()----------------');
  },
  // ===============setState実行とともにStateを記録するメソッド===============
  _logSetState: function (newState) {
    this._log.push(JSON.parse(JSON.stringify(
      this._log.length === 0 ? this.state : newState
    )));
    this.setState(newState);
    this._logIdx++;
  },
  // ===============json, csvのダウンロードメソッド===============
  _download: function (format, ev) {
    let outputdata = null;
    if (format === 'json') {
      outputdata = JSON.stringify(this.state.data);
    } else {
      outputdata = this.state.data.reduce(function (result, row) {
        return result + row.reduce(function (rowresult, cell, idx) {
          return rowresult
            + '"'
            + cell.replace(/"/g, '""')
            + '"'
            + (idx < row.length - 1 ? ',' : '');
        }, '')
          + "\n";
      }, '');
    }
    const URL = window.URL || window.webkitURL;
    const blob = new Blob([outputdata], { type: 'text/' + format });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  },
  // ===============検索機能がONのときに表に検索バーを描画するrender===============
  _renderSearch: function () {
    if (!this.state.search) {
      return null;
    }
    return (
      <tr onChange={this._search}>
        {this.props.headers.map(function (_ignore, idx) {
          return (
            <td key={idx}>
              <input type="text" data-idx={idx} />
            </td>
          )
        })}
      </tr>
    );
  },
  // ===============検索ボタンを描画するrender===============
  _renderToolbar: function () {
    return (
      <div className='toolbar'>
        <button onClick={this._toggleSearch}>検索</button>
        <a href='data.json' onClick={this._download.bind(this, 'json')}>JSONで保存</a>
        <a href='data.csv' onClick={this._download.bind(this, 'csv')}>CSVで保存</a>
      </div>
    );
  },
  // ===============表を描画するrender===============
  _renderTable: function () {
    return (
      <table>
        <thead onClick={this._sort}>
          <tr>
            {this.props.headers.map(function (title, idx) {
              if (this.state.sortby === idx) {
                title += this.state.descending ? '↑' : '↓'
              }
              return <th key={idx}>{title}</th>
            }, this)}
          </tr>
        </thead>
        <tbody onDoubleClick={this._showEditor}>
          {this._renderSearch()}
          {this.state.data.map(function (row, rowidx) {
            return (
              <tr key={rowidx}>
                {row.map(function (cell, idx) {
                  let content = cell;
                  const edit = this.state.edit;
                  if (edit) {
                    if (edit.row === rowidx && edit.cell === idx) {
                      content =
                        <form onSubmit={this._save}>
                          <input type="text" defaultValue={content} />
                        </form>
                    }
                  }
                  return <td key={idx} data-row={rowidx}>{content}</td>
                }, this)}
              </tr>
            )
          }, this)}
        </tbody>
      </table>
    );
  },
  // ===============操作方法を表示するrender===============
  _renderDescription: function () {
    return (
      <div>
        <p>・Alt + Shift + Z ... 操作を再生</p>
        <p>・Alt + Z         ... アンドゥ</p>
        <p>・Alt + Shift + X ... リドゥ</p>
      </div>
    );
  },
  // ===============メインのrender===============
  render: function () {
    return (
      <div>
        {this._renderToolbar()}
        {this._renderTable()}
        {this._renderDescription()}
      </div>
    )
  }
});

ReactDOM.render(
  React.createElement(Excel, {
    headers: headers,
    initialData: data
  }),
  document.getElementById('app1')
);
