/* テーブルのヘッダー列を生成するコンポーネント */
const Excel = React.createClass({
  // displayNameプロパティを設定することでコンポーネントの名称をReactに伝えることができる
  displayName: 'Excel',
  mixins: [React.addons.PureRenderMixin],
  // stateの初期値をinitialDataに設定
  getInitialState: function () {
    return {
      data: this.props.initialData
    }
  },
  render: function () {
    return (
      React.DOM.table(null,
        React.DOM.thead(null,
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
