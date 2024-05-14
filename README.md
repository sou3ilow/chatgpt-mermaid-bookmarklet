# What's this これは何？

This is a bookmarklet to visualize/unvisualize Mermaid format code output by ChatGPT(or Copilot).
When the bookmarklet is executed, a mermaid icon appears in the upper right corner, and each click on this icon toggles between source and image views.

ChatGPT(Copilot)が出力したMermaid形式のコードをビジュアライズ/解除するブックマークレットです。
ブックマークレットを実行すると右上隅にマーメイドのアイコンが現れ、これをクリックするごとにソース表示と画像表示が切り替わります。


|Off|On|
|---|---|
|![](image/before.png)|![](/image/after.png)|

# Install & Basic usage インストールと基本的な使い方

> [!IMPORTANT]
> If you are looking directly at README.md, the Bookmarklet link is not enabled with the following instructions. Please access the link below.
> [github.io/chatgpt-mermaid-bookmarklet](https://sou3ilow.github.io/chatgpt-mermaid-bookmarklet/)

Installation and usage instructions are as follows.

1. Download mermaid script (mermaid.min.js) from one of following links and save as a file.
    * [Official CDN(Recommend for ChatGPT)](https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js)
    * [Patched(Suporting Copilot)](./mermaid-patched/mermaid.min-11.0.0-alpha.7-patched.js)
2. **DRAG** following link on your bookmark toolbar to create bookmarklet.
[🧜‍♀️️ visualize][bmlink]

3. Visit [ChatGPT](https://chat.openai.com/) or [Copilot](https://copilot.microsoft.com/)
4. Click the bookmarklet then you will see a mermaid icon and a dialog on the center of the page.
5. Drag `mermaid.min.js` file and drop on the dialog in order to be loaded. 
6. Ask ChatGPT/Copilot to draw any graph in mermaid format.
7. Click the icon then you will see that the Mermaid code block is converted to diagram.

Step 1, 2, and 5 are required once (Step 5, 6 is required for each service). After set up is done, JS file is saved in localStorage and loaded from there.

> [!IMPORTANT]
> README.mdを直接見ている場合は以下の説明でBookmarkletリンクが有効になりません。下記のリンクにアクセスしてください。
> [github.io/chatgpt-mermaid-bookmarklet](https://sou3ilow.github.io/chatgpt-mermaid-bookmarklet/)

インストール、利用方法は次のとおりです。

1. Mermaidスクリプト(Mermaid.min.js)を下記のいずれかからダウンロードしてファイルとして保存します。
    * [Official CDN(Recommend for ChatGPT)](https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js)
    * [Patched(Suporting Copilot)](./mermaid-patched/mermaid.min-11.0.0-alpha.7-patched.js)
2. 下記のリンクをブックマークバーに**ドラッグ**してブックマークレットを作成します。
[🧜‍♀️️ visualize][bmlink]

3. [ChatGPT](https://chat.openai.com/) あるいは [Copilot](https://copilot.microsoft.com/) にアクセスします。
4. ブックマークレットをクリックします。ページの右上隅にマーメイドのアイコンが現れ中央にダイアログが現れます。
5. ダウンロードした`mermaid.min.js`をダイアログの上にドラッグし、JSファイルを読み込ませます。
6. ChatGPT/CopilotにMermaid形式で図を書くよう指示します。
7. マーメイドアイコンをクリックすると出力されたMermaidコードブロックがビジュアル化されます。

上記のステップ１，２、５は初回のみ必要です。（ステップ５, ６はサービス毎に実施が必要です。）２回目以降にBookmarkletを起動した場合、スクリプトはローカルストレージから読み込まれます。

# More.. その他の機能


## Toggle Display & Edit 表示切り替え・編集

By repeatedly clicking the icon, you can toggle between Mermaid format display and graph display. After displaying the graph, if you return to the Mermaid format display, it will become editable. If there is a syntax error in the Mermaid format output by the LLM, you can fix it on the page.

アイコンのクリックを繰り返すとMermaid形式表示とグラフ表示を切り替えることができます。
一度グラフ表示したあとにMermaid形式表示に戻すと編集可能になります。
LLMが出力したMermaid書式に問題があってSyntax Errorが発生する場合、ページ上で修正可能です。

## Icon Position アイコンの位置


You can drag and move the Mermaid icon to a desired position. The display position is saved and will appear in the same place the next time you start.

マーメイドアイコンの位置はドラッグして移動できます。表示位置は記録され、次回起動時に同じ場所に表示されます。

## Update Mermaid JS ファイル更新

To update Mermaid JS, follow these steps (needs to be executed for each site):
1. Right-click the icon to display the dialog
2. Drag and drop the new JS file

Mermaid JSをアップデートするには以下の手順に従います。(サイトごとに実行が必要です)
1. アイコンを右クリックしてダイアログを表示させる
2. 新しいJS Fileをドラッグ＆ドロップする

## Uninstall Localstorage アンインストール

To delete the recorded MermaidJS and other information from Localstorage, follow these steps (needs to be executed for each site):
1. Right-click the icon to display the dialog
2. Press the Uninstall button

記録したMermaidJSやその他の情報をLocalstorageから削除するには以下の手順にしたがいます。(サイトごとに実行が必要です)
1. アイコンを右クリックしてダイアログを表示させる
2. Uninstallボタンを押下する


# Note 技術的なメモ

## Install on localstorage

This bookmarklet uses Mermaid.js to visualize the Mermaid code. mermaid.js is published on CDN and freely accessible, but ChatGPT's CSP does not allow you to import it by specifying script.src or by using fetch.

To work around this limitation, we decided to have users download Mermaid.js and then pass it to the bookmarklet. Once passed, Mermaid.js is stored in localStorage (in ChatGPT's domain), so this operation is not necessary after the second time.

このブックマークレットはMermaid.jsを使ってMermaidのコードを可視化します。mermaid.jsはCDNで公開されており、自由にアクセスできますが、ChatGPTのCSPではscript.srcを指定したり、fetchを使ってインポートすることができません。

この制限を回避するために、ユーザにMermaid.jsをダウンロードしてもらい、それをブックマークレットに渡すことにしました。一度渡されたMermaid.jsはlocalStorage(ChatGPTのドメイン内)に保存されますので、2回目以降はこの操作は必要ありません。

## Patch for Mermaid.js

このブックマークレットでは表示されている画面の`code.language-mermaid` に該当する箇所を抽出して `mermaid.run({nodes:[TARGET]})`という形で一箇所ずつ渡します。
`mermaid.run`は`code.language-mermaid`というクエリを直接受け取ることもでき、その場合、内部で`document.querySelector`などを使ってこのqueryを処理します。
`document.querySelector`は強力ですが、ShadowDOMが利用されている場合(つまりCopilotの場合）にはその配下の要素を見つけることができません。
このブックマークレットではShadowDOMの内部まで探索して`code.laguage-mermaid`に合致するコードを見つけ、`mermaind.run`に渡します。

Mermaid.jsでは個々のレンダーの内部でも`document.querySelector`を利用して操作を行うため、Copilotでのビジュアライズを実現するには上記の対応でも不十分です。ここで提供しているパッチ適用されたMermaid.min.jsは`document.querySelector`が呼ばれているところ(ShadowDOM利用時にnullになるところ)が`TARGET.querySelector`の呼び出しになるよう、変更を加えています。

This bookmarklet extracts codes
 corresponds to `code.language-mermaid` 
 ,which is generated by ChatGPT/Copilot, 
 and processes it one by one in the form `mermaid.run({nodes:[TARGET]})`.
`mermaid.run` can also treat the query `code.language-mermaid` directly, in which case it processes this query internally using `document.querySelector`.
While `document.querySelector` is powerful, it cannot find the element under it if ShadowDOM is used (i.e. case of Copilot).
This bookmarklet will search inside the ShadowDOM to find the code matching `code.laguage-mermaid` and pass it to `mermaind.run`.

Since Mermaid.js also uses `document.querySelector` inside each diagram render, the above tweaks is not sufficient to achieve visualization in the case of Copilot. The patched Mermaid.min.js provided here has been modified so that where `document.querySelector` is called (where it becomes null when using ShadowDOM), it becomes a call to `TARGET.querySelector`. 


## Generate bookmarklet link for Markdown

Markdownではリンクを`[xxx](link)`という形式で表記します。
linkに`()`を含むと正しく認識できないため、
通常のbookmarkletではエスケープしないこれらの文字もエスケープする必要があります。このREADME.mdに添付しているブックマークレットは下記のコマンドで生成しています。

``` bash
bookmarklet source.js | sed 's/(/%28/g; s/)/%29/g' | pbcopy
```

## Misc その他

* We have not confirmed that it works with LLMs other than ChatGPT/Copilot. It may work.
* If ChatGTP/Copilot's CSP is enhanced, it is expected to stop working. In that case, we hope that visualization will be natively supported.
* We do not plan to update the patch even if Mermaid.js is updated.

* ChatGPT/Copilot以外のLLMでの動作確認は行っておりません。
* ChatGTP/CopilotのCSPが強化された場合、動作しなくなる見込みです。その場合はビジュアル化がネイティブサポートされることを期待したいです。
* Mermaid.jsのアップデートがあった場合でもパッチのアップデートは予定しておりません。

 
[bmlink]: javascript:%28function%28%29%7Blet%20isRendered%3D!1%3Bconst%20label%3D%22%F0%9F%A7%9C%E2%80%8D%E2%99%80%EF%B8%8F%EF%B8%8F%22%2Cversion%3D%22ver.%202024%20May%2015%22%2CscriptStorage%3D%22mermaidScript%22%2CdateStorage%3D%22mermaidScriptDate%22%2CpositionStorage%3D%22mermaidIconPosition%22%2CmermaidTheme%3D%22dark%22%2Cselector%3D%22code.language-mermaid%22%3Bfunction%20uninstall%28%29%7Bdelete%20window.mermaid%2ClocalStorage.removeItem%28scriptStorage%29%2ClocalStorage.removeItem%28dateStorage%29%2ClocalStorage.removeItem%28positionStorage%29%2Cconsole.info%28%60%24%7Blabel%7D%20Localstorage%28%24%7BscriptStorage%7D%2C%20%24%7BdateStorage%7D%2C%20%24%7BpositionStorage%7D%29%20is%20cleared.%60%29%2Cwindow.alert%28%22Localstorage%20is%20cleared.%22%29%7Dfunction%20listupTargets%28e%3Ddocument.body%29%7Bconst%20t%3D%5B%5D%3Bt.push%28...e.querySelectorAll%28selector%29%29%3Breturn%20e.querySelectorAll%28%22*%22%29.forEach%28%28e%3D%3E%7Be.shadowRoot%26%26t.push%28...listupTargets%28e.shadowRoot%29%29%7D%29%29%2Ct%7Dfunction%20toggleRendering%28e%29%7BisRendered%3Frestore%28%29%3Arender%28%29%2Ce%26%26e%28isRendered%29%7Dfunction%20render%28%29%7Blet%20e%3DlistupTargets%28%29%3Be.forEach%28%28e%3D%3E%7Be.dataset.original%3De.textContent%7D%29%29%2Cmermaid.run%28%7Bnodes%3Ae%2CsuppressErrors%3A!0%7D%29%2CisRendered%3D!0%2Cconsole.info%28%60%24%7Blabel%7D%20rendered%60%29%7Dfunction%20restore%28%29%7BlistupTargets%28%29.forEach%28%28e%3D%3E%7Be.querySelectorAll%28%22svg%22%29.forEach%28%28e%3D%3E%7Be.remove%28%29%7D%29%29%2Ce.dataset.processed%26%26%28e.textContent%3De.dataset.original%2Cdelete%20e.dataset.processed%29%2Ce.contentEditable%3D!0%7D%29%29%2CisRendered%3D!1%2Cconsole.info%28%60%24%7Blabel%7D%20restored%60%29%7Dfunction%20loadScriptFromStorage%28%29%7Blet%20e%3DlocalStorage.getItem%28scriptStorage%29%2Ct%3Dnew%20Date%28localStorage.getItem%28dateStorage%29%29%3BloadScript%28e%29%2Cconsole.info%28%60%24%7Blabel%7D%20script%20loaded%20from%20localStorage.%24%7BscriptStorage%7D%2C%20stored%20on%20%24%7Bt.toISOString%28%29%7D%60%29%7Dfunction%20loadScript%28e%29%7Bwindow.mermaid%26%26delete%20window.mermaid%3Bconst%20t%3D%22mermaid-onthefly%22%3Blet%20n%3Ddocument.head.querySelector%28%22%23%22%2Bt%29%3Bn%26%26document.head.removeChild%28n%29%3Bconst%20i%3Ddocument.createElement%28%22script%22%29%3Bi.id%3Dt%2Ci.textContent%3De%2Cdocument.head.appendChild%28i%29%2Cmermaid.initialize%28%7Btheme%3AmermaidTheme%7D%29%7Dfunction%20setupDraggable%28e%2Ct%29%7Bfunction%20n%28e%2Ct%29%7Blet%20n%3Dt.map%28%28e%3D%3E%22auto%22%3D%3D%3De%3Fe%3Ae%2B%22px%22%29%29%3Be.style.inset%3Dn.join%28%22%20%22%29%7De.draggable%3D!0%2Ce.addEventListener%28%22dragstart%22%2C%28function%28t%29%7Br.dragging%3D!0%2Cr.startClientX%3Dt.clientX%2Cr.startClientY%3Dt.clientY%2Cr.startTargetLeft%3De.offsetLeft%2Cr.startTargetTop%3De.offsetTop%2Ce.addEventListener%28%22dragend%22%2Cl%29%2Ce.addEventListener%28%22drag%22%2Ca%29%2Ce.addEventListener%28%22dragover%22%2Co%29%7D%29%29%3Blet%20i%3Dfunction%28e%29%7Blet%20t%3DlocalStorage.getItem%28e%29%3Bif%28!t%29return%20null%3Blet%5Bn%2Ci%2Cr%2Co%5D%3Dt.split%28%22%2C%22%29%3Breturn%22auto%22!%3Dn%26%26n%3Ewindow.innerHeight%7C%7C%22auto%22!%3Dr%26%26r%3Ewindow.innerHeight%7C%7C%22auto%22!%3Do%26%26o%3Ewindow.innerWidth%7C%7C%22auto%22!%3Di%26%26i%3Ewindow.innerWidth%3Fnull%3A%5Bn%2Ci%2Cr%2Co%5D%7D%28%29%7C%7C%5B50%2C20%2C%22auto%22%2C%22auto%22%5D%3Bn%28e%2Ci%29%3Bvar%20r%3D%7B%7D%3Bfunction%20o%28e%29%7Be.preventDefault%28%29%7Dfunction%20a%28t%29%7Bif%28t.preventDefault%28%29%2Cr.dragging%29%7Bif%28t.clientX%3C0%7C%7Ct.clientY%3C0%7C%7Ct.clientX%3Ewindow.innerWidth%7C%7Ct.clientY%3Ewindow.innerHeight%29return%20console.log%28%22outside%20of%20window%22%29%2Cvoid%20l%28t%29%3Blet%20o%3Dr.startTargetLeft%2B%28t.clientX-r.startClientX%29%2Ca%3Dr.startTargetTop%2B%28t.clientY-r.startClientY%29%2Cd%3DMath.max%280%2CMath.min%28o%2Cwindow.innerWidth-e.offsetWidth%29%29%2Cs%3DMath.max%280%2CMath.min%28a%2Cwindow.innerHeight-e.offsetHeight%29%29%3Bfunction%20i%28e%2Ct%2Cn%29%7Breturn%20e%3C%28t-n%29%2F2%3F%5Be%2C%22auto%22%5D%3A%5B%22auto%22%2Ct-e-n%5D%7Dlet%5Bc%2Cg%5D%3Di%28s%2Cwindow.innerHeight%2Ce.offsetHeight%29%2C%5Bp%2Cu%5D%3Di%28d%2Cwindow.innerWidth%2Ce.offsetWidth%29%3Br.trbl%3D%5Bc%2Cu%2Cg%2Cp%5D%2Cn%28e%2Cr.trbl%29%7D%7Dfunction%20l%28n%29%7Bn.preventDefault%28%29%2Cr.dragging%3D!1%2Ce.removeEventListener%28%22dragend%22%2Cl%29%2Ce.removeEventListener%28%22drag%22%2Ca%29%2Ce.removeEventListener%28%22dragover%22%2Co%29%3Btry%7Bi%3Dt%2Cd%3Dr.trbl%2ClocalStorage.setItem%28i%2Cd.join%28%22%2C%22%29%29%7Dcatch%28e%29%7Bconsole.error%28e%29%7Dvar%20i%2Cd%7D%7Dfunction%20setupFileReciever%28e%2Ct%29%7Be.addEventListener%28%22dragover%22%2C%28function%28t%29%7Bt.preventDefault%28%29%2Ce.classList.add%28%22dragover%22%29%7D%29%29%2Ce.addEventListener%28%22dragleave%22%2C%28function%28t%29%7Be.classList.remove%28%22dragover%22%29%7D%29%29%2Ce.addEventListener%28%22drop%22%2C%28function%28n%29%7Bn.preventDefault%28%29%2Ce.classList.remove%28%22dragover%22%29%3Bconst%20i%3Dn.dataTransfer.files%5B0%5D%3Bif%28!i%29return%3Bconst%20r%3Dnew%20FileReader%3Br.onload%3Dfunction%28e%29%7Blet%20n%3Dnew%20Date%3BlocalStorage.setItem%28scriptStorage%2Ce.target.result%29%2ClocalStorage.setItem%28dateStorage%2Cn%29%2Cconsole.info%28%60%24%7Blabel%7D%20content%20is%20stored%20at%20%24%7BscriptStorage%7D%20%28%24%7Bn%7D%29%60%29%2CloadScriptFromStorage%28%29%2Cconsole.info%28%60%24%7Blabel%7D%20Script%20is%20reloaded.%60%29%2Cwindow.alert%28%22Script%20is%20reloaded.%22%29%2Ct%26%26t%28%29%7D%2Cr.readAsText%28i%29%7D%29%29%7Dfunction%20create%28e%2C%7Bid%3At%3Dnull%2Cklass%3An%3Dnull%2Chtml%3Ai%3Dnull%2Ctext%3Ar%3Dnull%2Cattr%3Ao%3D%7B%7D%2Cstyle%3Aa%3D%7B%7D%2Con%3Al%3D%7B%7D%2Cchild%3Ad%3D%5B%5D%7D%29%7Blet%20s%3Ddocument.createElement%28e%29%3Bn%26%26%28s.className%3Dn%29%2Ct%26%26%28s.id%3Dt%29%2Ci%26%26%28s.innerHTML%3Di%29%2Cr%26%26%28s.textContent%3Dr%29%3Bfor%28let%20e%20in%20o%29s%5Be%5D%3Do%5Be%5D%3Bfor%28let%20e%20in%20a%29s.style%5Be%5D%3Da%5Be%5D%3Bfor%28let%20e%20in%20l%29s.addEventListener%28e%2Cl%5Be%5D%29%3Bfor%28let%20e%20of%20d%29s.appendChild%28e%29%3Breturn%20s%7Dlet%20initialized%3D!1%3Bfunction%20initialize%28%29%7Binitialized%7C%7C%28setup%28%29%2Cinitialized%3D!0%29%7Dfunction%20setup%28%29%7Blet%20e%3Ddocument.body.attachShadow%28%7Bmode%3A%22open%22%7D%29%3Be.appendChild%28document.createElement%28%22slot%22%29%29%3Bconst%20t%3D!!localStorage.getItem%28scriptStorage%29%3Bt%26%26loadScriptFromStorage%28%29%3Bconst%20n%3D%22mermaidButton%22%2Ci%3D%22dialog%22%2Cr%3D%22droparea%22%3Blet%20o%3Ddocument.createElement%28%22style%22%29%3Bfunction%20a%28%29%7Bd.style.visibility%3D%22hidden%22%7De.appendChild%28o%29%2Co.textContent%3D%60*%20%7B%5Cn%20%20%20%20font-size%3A%20small%3B%5Cn%7D%23%24%7Bn%7D%20%7B%5Cn%20%20%20%20display%3A%20inline%20!important%3B%5Cn%20%20%20%20position%3A%20fixed%3B%5Cn%20%20%20%20font-size%3A%2018pt%3B%5Cn%20%20%20%20border%3A%201px%20solid%20lightgray%3B%5Cn%20%20%20%20border-radius%3A%205px%3B%5Cn%20%20%20%20padding%3A%201px%205px%3B%5Cn%20%20%20%20z-index%3A%201000%3B%5Cn%20%20%20%20transition%3A%20transform%200.5s%3B%5Cn%7D%23%24%7Bn%7D.rendered%20%7B%5Cn%20%20%20%20transform%3A%20scaleX%28-1%29%3B%5Cn%7D%23%24%7Bi%7D%20%7B%5Cn%20%20%20%20visibility%3A%20%24%7Bt%3F%22hidden%22%3A%22visible%22%7D%3B%5Cn%20%20%20%20min-width%3A%20400px%3B%5Cn%20%20%20%20min-height%3A%20250px%3B%5Cn%20%20%20%20position%3A%20fixed%3B%5Cn%20%20%20%20top%3A%2010%25%3B%5Cn%20%20%20%20left%3A%2050%25%3B%5Cn%20%20%20%20transform%3A%20translate%28-50%25%2C%200%29%3B%5Cn%20%20%20%20z-index%3A%201000%3B%5Cn%20%20%20%20border%3A%201px%20solid%20lightgray%3B%5Cn%20%20%20%20drpo-shadow%3A%205px%205px%205px%20gray%3B%5Cn%20%20%20%20background-color%3A%20white%3B%5Cn%20%20%20%20border-radius%3A%205px%3B%5Cn%20%20%20%20padding%3A%2020px%3B%5Cn%7D%23%24%7Br%7D%20%7B%5Cn%20%20%20%20width%3A%2080%25%3B%5Cn%20%20%20%20height%3A%2030px%3B%5Cn%20%20%20%20margin%3A%20auto%3B%5Cn%20%20%20%20padding%3A%2020px%3B%5Cn%20%20%20%20border%3A%201px%20solid%20lightgray%3B%5Cn%20%20%20%20background-color%3A%20lightgray%3B%5Cn%20%20%20%20border-radius%3A%205px%3B%5Cn%7D%23%24%7Br%7D.dragover%20%7B%5Cn%20%20%20%20background-color%3A%20pink%3B%5Cn%7D%60%3Blet%20l%3Dcreate%28%22div%22%2C%7Bid%3Ar%2Ctext%3A%22Drag%20%26%20Drop%20Mermaid%20JS%20here!%22%7D%29%3BsetupFileReciever%28l%2Ca%29%3Blet%20d%3Dcreate%28%22div%22%2C%7Bid%3Ai%2Cchild%3A%5Bcreate%28%22button%22%2C%7Bid%3A%22cancel%22%2Con%3A%7Bclick%3Aa%7D%2Ctext%3A%22%E2%9C%96%22%7D%29%2Ccreate%28%22p%22%2C%7Bhtml%3A%22%5Cn%3Cspan%3ETo%20load%20or%20update%20Mermaid%20JS%2C%20please%20follow%20the%20steps%20below%3A%3C%2Fspan%3E%5Cn%3Col%3E%5Cn%20%20%20%20%3Cli%3E%20Download%20Mermaid%20JS%20from%5Cn%20%20%20%20%20%20%20%20%3Cul%3E%5Cn%20%20%20%20%20%20%20%20%3Cli%3E%20%3Ca%20href%3D'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fmermaid%2Fdist%2Fmermaid.min.js'%3EOfficial%20CDN%3C%2Fa%3E%3C%2Fli%3E%5Cn%20%20%20%20%20%20%20%20%3Cli%3E%20%3Ca%20href%3D'https%3A%2F%2Fsou3ilow.github.io%2Fchatgpt-mermaid-bookmarklet%2Fmermaid-patched%2Fmermaid.min-11.0.0-alpha.7-patched.js'%3EPatched%20version%3C%2Fa%3E%3C%2Fli%3E%5Cn%20%20%20%20%20%20%20%20%3C%2Ful%3E%5Cn%20%20%20%20%3C%2Fli%3E%5Cn%20%20%20%20%3Cli%3E%20Drag%20%26%20drop%20the%20script%20file%20below%20%3C%2Fli%3E%5Cn%3C%2Fol%3E%22%7D%29%2Cl%2Ccreate%28%22p%22%2C%7Bhtml%3A%22%5Cn%3Cspan%3EOr%2C%20you%20can%20uninstall%20the%20script%20by%20clicking%20the%20button%20below%3A%3C%2Fspan%3E%22%7D%29%2Ccreate%28%22button%22%2C%7Btext%3A%22Uninstall%22%2Con%3A%7Bclick%3A%28%29%3D%3E%7Buninstall%28%29%2Ca%28%29%7D%7D%7D%29%5D%7D%29%3Be.appendChild%28d%29%3Blet%20s%3Dcreate%28%22button%22%2C%7Bid%3An%2Ctext%3Alabel%7D%29%3Bs.style.visibility%3D%22hidden%22%2Ce.appendChild%28s%29%2CsetupDraggable%28s%2CpositionStorage%29%2Cs.style.visibility%3D%22visible%22%2Cs.addEventListener%28%22contextmenu%22%2C%28function%28e%29%7Be.preventDefault%28%29%2Cd.style.visibility%3D%22visible%22%3D%3D%3Dd.style.visibility%3F%22hidden%22%3A%22visible%22%7D%29%29%2Cs.addEventListener%28%22click%22%2C%28function%28%29%7Bwindow.mermaid%3FtoggleRendering%28%28e%3D%3E%7Be%3Fs.classList.add%28%22rendered%22%29%3As.classList.remove%28%22rendered%22%29%7D%29%29%3Ad.style.visibility%3D%22visible%22%7D%29%29%3Blet%20c%3DlocalStorage.getItem%28dateStorage%29%3Bconsole.info%28%60%24%7Blabel%7D%20hello!%20bookmarklet%3A%24%7Bversion%7D%20script%3A%20%24%7Bc%7D%60%29%2Cwindow.uninstallMermaid%3Duninstall%2Cconsole.info%28%22execute%20%60uninstallMermaid%28%29%60%20to%20uninstall%20saved%20data%20by%20this%20script%22%29%7Dinitialize%28%29%3B%7D%29%28%29
