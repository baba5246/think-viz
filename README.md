# think-viz

Web ブラウジング中のユーザの動きから「考え中」の状態を可視化するための実験的な計測環境です。

![think-viz](https://i.imgur.com/BlmsgMc.jpg)


## 前提

* ローカル実行を想定
* iframe cross domain 問題に対しては、 chrome の secure を以下の方法で外しておく
  * `open /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir`
  * 参考： https://qiita.com/growsic/items/a919a7e2a665557d9cf4
