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
      data: this.props.initialData
    }
  },
  // ヘッダーをクリックしてソートするメソッド
  _sort: function (e) {
    console.log('----------- start _sort()----------------');
    // tableに対してcellIndexプロパティを指定すると、そのth(td)の行内における添字を取得できる(ReactではなくDOMの機能)
    const column = e.target.cellIndex;
    // 並べ替えの元となるデータを現在のstateからコピーする(Array.from(配列)で配列のシャローコピーを取得)
    const data = Array.from(this.state.data);
    // 配列のコピーをArray.sort()で行う
    data.sort(function (a, b) {
      // 文字コードが若いほうが先にくるソート
      return a[column] > b[column] ? 1 : -1;
    });
    // ソートしたdataをsetStateで更新する
    this.setState({
      data: data
    });
    console.log('----------- end   _sort()----------------');
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
              return React.DOM.th({ key: idx }, title);
            })
          )
        ),
        React.DOM.tbody(null,
          // dataの配列が一行づつmapで処理される
          this.state.data.map(function (row, idx) {
            return (
              // 配列の値の一つづつがmapで処理される
              React.DOM.tr({ key: idx }, row.map(function (cell, idx) {
                return React.DOM.td({ key: idx }, cell);
              })
              )
            );
          })
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
