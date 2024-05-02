# What's this

ChatGPTが出力したMermaid形式のコードをビジュアライズ/解除するブックマークレットです。

Bookmarklet to visualize/unvisualize Mermaid format code output by ChatGPT.

ブックマークレットを実行すると右上隅にマーメイドのアイコンが現れ、これをクリックするごとにソース表示と画像表示が切り替わります。

When the bookmarklet is executed, a mermaid icon appears in the upper right corner, and each click on this icon toggles between source and image views.

|Off|On|
|---|---|
|![](image/before.png)|![](/image/after.png)|

# Install & Usage

> [!IMPORTANT]
> README.mdを直接見ている場合は以下の説明でBookmarkletリンクが有効になりません。下記のリンクにアクセスしてください。
> If you are looking directly at README.md, the Bookmarklet link is not enabled with the following instructions. Please access the link below.
> [github.io/chatgpt-mermaid-bookmarklet](https://sou3ilow.github.io/chatgpt-mermaid-bookmarklet/)

インストール、利用方法は次のとおりです。

1. Mermaidスクリプト(Mermaid.min.js)を下記のいずれかからダウンロードしてファイルとして保存します。Download mermaid script (mermaid.min.js) from one of following links and save as a file.
    * [Official CDN(Recommend for ChatGPT)](https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js)
    * [Patched(Suporting Copilot)](./mermaid-patched/mermaid.min-11.0.0-alpha.7-patched.js)
2. 下記のリンクをブックマークバーに**ドラッグ**してブックマークレットを作成します。**DRAG** following link on your bookmark toolbar to create bookmarklet.
[🧜‍♀️️ visualize](javascript:%28function%28%29%7Blet%20isRendered%3D!1%3Bconst%20label%3D%22%F0%9F%A7%9C%E2%80%8D%E2%99%80%EF%B8%8F%EF%B8%8F%22%2Cversion%3D%22ver.%202024%20Apr%2030%22%2CstorageName%3D%22mermaidScript%22%2CstorageDate%3D%22mermaidScriptDate%22%2Cselector%3D%22code.language-mermaid%22%3Bfunction%20listupTargets%28e%3Ddocument.body%29%7Bconst%20t%3D%5B%5D%3Bt.push%28...e.querySelectorAll%28selector%29%29%3Breturn%20e.querySelectorAll%28%22*%22%29.forEach%28%28e%3D%3E%7Be.shadowRoot%26%26t.push%28...listupTargets%28e.shadowRoot%29%29%7D%29%29%2Ct%7Dfunction%20render%28%29%7Blet%20e%3DlistupTargets%28%29%3Be.forEach%28%28e%3D%3E%7Be.dataset.original%3De.textContent%7D%29%29%2Cmermaid.run%28%7Bnodes%3Ae%2CsuppressErrors%3A!0%7D%29%2CisRendered%3D!0%2Cconsole.info%28%60%24%7Blabel%7D%20rendered%60%29%7Dfunction%20restore%28%29%7BlistupTargets%28%29.forEach%28%28e%3D%3E%7Be.querySelectorAll%28%22svg%22%29.forEach%28%28e%3D%3E%7Be.remove%28%29%7D%29%29%2Ce.dataset.processed%26%26%28e.textContent%3De.dataset.original%2Cdelete%20e.dataset.processed%29%7D%29%29%2CisRendered%3D!1%2Cconsole.info%28%60%24%7Blabel%7D%20restored%60%29%7Dfunction%20loadScriptFromStorage%28%29%7Blet%20e%3DlocalStorage.getItem%28storageName%29%2Ct%3Dnew%20Date%28localStorage.getItem%28storageDate%29%29%3BloadScript%28e%29%2Cconsole.info%28%60%24%7Blabel%7D%20script%20loaded%20from%20localStorage.%24%7BstorageName%7D%2C%20stored%20on%20%24%7Bt.toISOString%28%29%7D%60%29%7Dfunction%20loadScript%28e%29%7Bwindow.mermaid%26%26delete%20window.mermaid%3Bconst%20t%3D%22mermaid-onthefly%22%3Blet%20o%3Ddocument.head.querySelector%28%22%23%22%2Bt%29%3Bo%26%26document.head.removeChild%28o%29%3Bconst%20r%3Ddocument.createElement%28%22script%22%29%3Br.id%3Dt%2Cr.textContent%3De%2Cdocument.head.appendChild%28r%29%2Cmermaid.initialize%28%7Btheme%3A%22dark%22%7D%29%7Dfunction%20setupDragDropListener%28e%29%7Be.addEventListener%28%22dragover%22%2C%28function%28t%29%7Bt.preventDefault%28%29%2Ce.classList.add%28%22dragover%22%29%7D%29%29%2Ce.addEventListener%28%22dragleave%22%2C%28function%28t%29%7Be.classList.remove%28%22dragover%22%29%7D%29%29%2Ce.addEventListener%28%22drop%22%2C%28function%28t%29%7Bt.preventDefault%28%29%2Ce.classList.remove%28%22dragover%22%29%3Bconst%20o%3Dt.dataTransfer.files%5B0%5D%3Bif%28!o%29return%3Bconst%20r%3Dnew%20FileReader%3Br.onload%3Dfunction%28e%29%7Bnew%20Date%3BloadScript%28e.target.result%29%3Bconsole.info%28%60%24%7Blabel%7D%20Script%20is%20reloaded.%60%29%2Cwindow.alert%28%22Script%20is%20reloaded.%22%29%7D%2Cr.readAsText%28o%29%7D%29%29%7Dfunction%20setup%28%29%7BlocalStorage.getItem%28storageName%29%26%26loadScriptFromStorage%28%29%3Bconst%20e%3D%22mermaidButton%22%3Bif%28document.querySelector%28%22%23%22%2Be%29%29%3Belse%7Blet%20t%3Ddocument.createElement%28%22style%22%29%3Bdocument.head.appendChild%28t%29%2Ct.sheet.insertRule%28%60%23%24%7Be%7D%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20display%3A%20inline%20!important%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20position%3A%20fixed%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20top%3A%2050px%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20right%3A%2020px%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2018pt%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20border%3A%201px%20solid%20lightgray%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20border-radius%3A%205px%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20padding%3A%201px%205px%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%60%2Ct.sheet.cssRules.length%29%2Ct.sheet.insertRule%28%60%23%24%7Be%7D.dragover%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20background-color%3A%20pink%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%60%2Ct.sheet.cssRules.length%29%3Blet%20o%3Ddocument.createElement%28%22button%22%29%3Bo.id%3De%2Co.textContent%3Dlabel%2CsetupDragDropListener%28o%29%2Cdocument.body.appendChild%28o%29%2Co.addEventListener%28%22click%22%2C%28function%28%29%7Bif%28!window.mermaid%29%7Bconst%20e%3D%22Mermaid%20is%20not%20loaded.%20Please%20follow%20the%20steps%20below%20to%20set%20it%20up.%5Cn%5Cn1.%20Download%20Mermaid%20JS%20from%20https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fmermaid%2Fdist%2Fmermaid.min.js%5Cn2.%20Drag%20%26%20drop%20the%20script%20file%20on%20the%20mermaid%20button%20on%20this%20page.%22%3Bthrow%20window.alert%28e%29%2Ce%7DisRendered%3F%28restore%28%29%2Co.style.backgroundColor%3D%22white%22%29%3A%28render%28%29%2Co.style.backgroundColor%3D%22gray%22%29%7D%29%29%7Dlet%20t%3DlocalStorage.getItem%28storageDate%29%3Bconsole.info%28%60%24%7Blabel%7D%20hello!%20bookmarklet%3A%24%7Bversion%7D%20script%3A%20%24%7Bt%7D%60%29%7Dsetup%28%29%3B%7D%29%28%29)

3. [ChatGPT](https://chat.openai.com/) あるいは [Copilot](https://copilot.microsoft.com/) にアクセスします。Visit [ChatGPT](https://chat.openai.com/) or [Copilot](https://copilot.microsoft.com/)
4. ブックマークレットをクリックします。ページの右上隅にマーメイドのアイコンが現れます。Click the bookmarklet then you will see a mermaid icon.
5. ダウンロードした`mermaid.min.js`をマーメイドアイコンの上にドラッグし、JSファイルを読み込ませます。Drag `mermaid.min.js` file and drop on the icon inorder to be loaded.
6. ChatGPT/CopilotにMermaid形式で図を書くよう指示します。Ask ChatGPT/Copilot to draw any graph in mermaid format.
7. マーメイドアイコンをクリックすると出力されたMermaidコードブロックがビジュアル化されます。Click the icon then you will see that the Mermaid code block is converted to diagram.

上記のステップ１，２、５は初回のみ必要です。（ステップ５はサービス毎に実施が必要です。）２回目以降にBookmarkletを起動した場合、スクリプトはローカルストレージから読み込まれます。
Step 1, 2 and 5 is required once (Step 5 is required for each service). After set up is done, JS file is saved in localStorage and loaded from there.

# Note

## Install & uninstall Mermaid.js 

このブックマークレットはMermaid.jsを使ってMermaidのコードを可視化します。mermaid.jsはCDNで公開されており、自由にアクセスできますが、ChatGPTのCSPではscript.srcを指定したり、fetchを使ってインポートすることができません。

This bookmarklet uses Mermaid.js to visualize the Mermaid code. mermaid.js is published on CDN and freely accessible, but ChatGPT's CSP does not allow you to import it by specifying script.src or by using fetch.

この制限を回避するために、ユーザにMermaid.jsをダウンロードしてもらい、それをブックマークレットに渡すことにしました。一度渡されたMermaid.jsはlocalStorage(ChatGPTのドメイン内)に保存されますので、2回目以降はこの操作は必要ありません。

To work around this limitation, we decided to have users download Mermaid.js and then pass it to the bookmarklet. Once passed, Mermaid.js is stored in localStorage (in ChatGPT's domain), so this operation is not necessary after the second time.


ブックマークレットを完全に削除するには、ChatGPTにアクセスした状態でデベロッパーコンソールを開き、以下の操作を行う必要があります：

To completely remove the bookmarklet, you must open the Developer Console while visiting ChatGPT and do the following:

```
delete localstorage.mermaidScript
delete localstorage.mermaidScriptDate
```

## Patch for Mermaid.js

このブックマークレットでは表示されている画面の`code.language-mermaid` に該当する箇所を抽出して `mermaid.run({nodes:[TARGET]})`という形で一箇所ずつ渡します。
`mermaid.run`は`code.language-mermaid`というクエリを直接受け取ることもでき、その場合、内部で`document.querySelector`などを使ってこのqueryを処理します。
`document.querySelector`は強力ですが、ShadowDOMが利用されている場合(つまりCopilotの場合）にはその配下の要素を見つけることができません。
このブックマークレットではShadowDOMの内部まで探索して`code.laguage-mermaid`に合致するコードを見つけ、`mermaind.run`に渡します。

This bookmarklet extracts codes
 corresponds to `code.language-mermaid` 
 ,which is generated by ChatGPT/Copilot, 
 and processes it one by one in the form `mermaid.run({nodes:[TARGET]})`.
`mermaid.run` can also treat the query `code.language-mermaid` directly, in which case it processes this query internally using `document.querySelector`.
While `document.querySelector` is powerful, it cannot find the element under it if ShadowDOM is used (i.e. case of Copilot).
This bookmarklet will search inside the ShadowDOM to find the code matching `code.laguage-mermaid` and pass it to `mermaind.run`.

Mermaid.jsでは個々のレンダーの内部でも`document.querySelector`を利用して操作を行うため、Copilotでのビジュアライズを実現するには上記の対応でも不十分です。ここで提供しているパッチ適用されたMermaid.min.jsは`document.querySelector`が呼ばれているところ(ShadowDOM利用時にnullになるところ)が`TARGET.querySelector`の呼び出しになるよう、変更を加えています。

Since Mermaid.js also uses `document.querySelector` inside each diagram render, the above tweaks is not sufficient to achieve visualization in the case of Copilot. The patched Mermaid.min.js provided here has been modified so that where `document.querySelector` is called (where it becomes null when using ShadowDOM), it becomes a call to `TARGET.querySelector`. 


## Generate bookmarklet link for Markdown

Markdownではリンクを`[xxx](link)`という形式で表記します。
linkに`()`を含むと正しく認識できないため、
通常のbookmarkletではエスケープしないこれらの文字もエスケープする必要があります。このREADME.mdに添付しているブックマークレットは下記のコマンドで生成しています。

``` bash
bookmarklet source.js | sed 's/(/%28/g; s/)/%29/g' | pbcopy
```

## Misk

* ChatGPT/Copilot以外のLLMでの動作確認は行っておりません。
 We have not confirmed that it works with LLMs other than ChatGPT/Copilot. It may work.
* ChatGTP/CopilotのCSPが強化された場合、動作しなくなる見込みです。その場合はビジュアル化がネイティブサポートされることを期待したいです。
 If ChatGTP/Copilot's CSP is enhanced, it is expected to stop working. In that case, we hope that visualization will be natively supported.
* Mermaid.jsのアップデートがあった場合でもパッチのアップデートは予定しておりません。
 We do not plan to update the patch even if Mermaid.js is updated.