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
      edit: null
    }
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
    // ソートしたdataをsetStateで更新する
    this.setState({
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
    this.setState({
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
    this.setState({
      data: data,
      // イベントが終わるので保持していたセルの情報をクリアする
      edit: null
    });
    console.log('----------- end   _save()----------------');
  },
  render: function () {
    return (
      React.DOM.table(null,
        React.DOM.thead({ onClick: this._sort },
          React.DOM.tr(null,
            // Array.prototype.map(callback)
            // headersプロパティ(配列)の中身を一つづつ処理する
            // 第一引数:値, 第二引数:配列の添字, 第三引数:配列自身
            this.props.headers.map(function (title, idx) {
              // ソート基準となっている列が昇順か降順かで記号を付与する
              if (this.state.sortby === idx) {
                title += this.state.descending ? '↑' : '↓'
              }
              return React.DOM.th({ key: idx }, title);
            }, this)
          )
        ),
        React.DOM.tbody({ onDoubleClick: this._showEditor },
          // dataの配列が一行づつmapで処理される
          this.state.data.map(function (row, rowidx) {
            return (
              // 配列の値の一つづつがmapで処理される
              React.DOM.tr({ key: rowidx }, row.map(function (cell, idx) {
                let content = cell;
                const edit = this.state.edit;
                if (edit) {
                  // idx(cellの添字)とrowidx(行番号)がプロパティの値と一致するとき、
                  if (edit.row === rowidx && edit.cell === idx) {
                    // contentを入力フィールドに置き換える。そうでない場合はそのまま。
                    content = React.DOM.form({ onSubmit: this._save },
                      React.DOM.input({
                        type: 'text',
                        defaultValue: content
                      })
                    );
                  }
                }
                return React.DOM.td({
                  key: idx,
                  'data-row': rowidx
                }, content);
              }, this)
              )
            );
          }, this)
        )
      )
    );
  }
});

ReactDOM.render(
  React.createElement(Excel, {
    headers: headers,
    initialData: data
  }),
  document.getElementById('app1')
);
