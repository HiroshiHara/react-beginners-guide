/* JSX */
// Javascriptの文法自体には反しているため、Babelでトランスパイルする必要がある。
// なお、実際の運用ではトランスパイルはサーバで実行されるべき。重いので。
const jsx1 = React.createClass({
  displayName: 'jsx1',
  render: function () {
    return (
      <h1 id="my-heading">
        <span><em>Hello</em>o</span> world!
      </h1>
    );
  }
});

ReactDOM.render(
  React.createElement(jsx1),
  document.getElementById('app1')
);
