/* JSX */
// Javascriptの文法自体には反しているため、Babelでトランスパイルする必要がある。
// なお、実際の運用ではトランスパイルはサーバで実行されるべき。重いので。
const jsx1 = React.createClass({
  displayName: 'jsx1',
  render: function () {
    return (
      <h1 id="my-heading">
        <span><em>Hell</em>o</span> world!
      </h1>
    );
  }
});

const jsx2 = React.createClass({
  displayName: 'jsx2',
  _renderAboutBlank: function () {
    return (
      // Use "className" instead "class"
      // Similarly, Use "htmlFor" instead "for"
      <div className="wrapper">
        <div className="container">
          <p>・連続する空白は1つにまとめられる。</p>
          <p>{1} plus {2} is    {3}</p>
        </div>
        <div className="container">
          <p>・2つ以上の空白は文字列値として表現する。</p>
          <p>{1}{' '}plus {' '}{2}  is  {3}</p>
        </div>
      </div>
    );
  },
  _renderAboutComment: function () {
    return (
      <div className="wrapper">
        <div className="container">
          <p>・コメントはJSのコード同様に記述できる。</p>
          <p>単一行コメントは末尾の}もコメント扱いになるので面倒だから使わないこと。</p>
          <p>{/* コメントはこの形式で書く */}</p>
        </div>
      </div>
    );
  },
  _renderAboutEntity: function () {
    return (
      <div className="wrapper">
        <div className="container">
          <p>・HTMLのエンティティも使用できる。</p>
          <p>詳しくはこちら &raquo;</p>
        </div>
        <div className="container">
          <p>・JSの式の中でエンティティを使いたいときは、代わりにUnicodeで記述する。</p>
          <p>{"詳しくはこちら \u00bb"}</p>
        </div>
      </div>
    )
  },
  _renderAboutXSS: function () {
    const xss = 'XSS: <scr' + 'ipt scr="http://evil/co.js"></scr' + 'ipt>';
    return (
      <div className="wrapper">
        <div className="container">
          <p>・Reactでは全ての文字列は自動でエスケープ処理される。</p>
          <p>{"URLを含む文字列を表示..."}{xss}</p>
        </div>
      </div>
    )
  },
  _renderAboutSpreadLiteral: function () {
    // this.propsからsizeプロパティを除外してオブジェクト(attr)を生成
    const { size, ...attr } = this.props;
    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <p>・コンポーネントのプロパティをスプレッド演算子で渡せる。</p>
            <a {...attr}>google</a>
          </div>
        </div>
      </div>
    )
  },
  render: function () {
    return (
      <div>
        {this._renderAboutBlank()}
        {this._renderAboutComment()}
        {this._renderAboutEntity()}
        {this._renderAboutXSS()}
        {this._renderAboutSpreadLiteral()}
      </div>
    );
  }
});

const jsx4 = React.createClass({
  displayName: 'jsx4',
  render: function () {
    const style = {
      color: 'red',
      // All properties must express on Camel Case
      // However, custom data properties must express like html
      backgroundColor: 'black',
      fontSize: '30px'
    };
    return (
      <div className="wrapper">
        <div className="container">
          <p style={style}>・style属性はオブジェクトで指定する。</p>
          <input type="text" placeholder="閉じタグは必須" />
        </div>
      </div>
    )
  }
});

// const jsx3 = React.createClass({
//   displayName: jsx3,
//   render: function () {
//     console.log(this.props.children);
//     return (
//       <div className="wrapper">
//         <div className="container">
//           <p>・ノードの兄弟要素を配列にしてコンポーネントのプロパティにすることで、this.props.childrenでまとめて表示できる。
//           </p>
//           <p>{this.props.children}</p>
//         </div>
//       </div>
//     )
//   }
// });

ReactDOM.render(
  React.createElement(jsx1),
  document.getElementById('app1')
);

ReactDOM.render(
  React.createElement(jsx2, {
    // test props for spread literal
    href: 'https://www.google.com',
    size: '10',
  }),
  document.getElementById('app2')
);

// ReactDOM.render(
//   // Not have to use createElement()
//   // And test for Sibling nodes
//   <jsx3>
//     <p>・複数のノードを他のタグでラップしないとエラーになる。<br />
//     render()に直接書けば出来なくはない。</p>
//     <span key="greet">Hello</span>
//     {' '}
//     <span key="world">World</span>
//     {'!'}
//   </jsx3>,
//   document.getElementById('app3')
// );

ReactDOM.render(
  React.createElement(jsx4),
  document.getElementById('app4')
);
