# letWordsGoAway
将index.html、result.html、result-anim.js放到同一个文件下，然后访问index.html，就可以看到效果了！
- [letWordsGoAway](#letwordsgoaway)
- [记录](#记录)
  - [6.22上午：](#622上午)
  - [6.23下午：](#623下午)
      - [完成功能：](#完成功能)
      - [学习记录：](#学习记录)
        - [index.html 代码详解](#indexhtml-代码详解)
        - [表单 \<form\> 知识扩展：](#表单-form-知识扩展)
        - [result.html 代码详解](#resulthtml-代码详解)
        - [document对象知识扩展：](#document对象知识扩展)
  - [6.24下午：](#624下午)
      - [完成功能：](#完成功能-1)
      - [学习记录：](#学习记录-1)
        - [result.html 更改代码详解：](#resulthtml-更改代码详解)
  - [6.25下午：](#625下午)
      - [学习记录：](#学习记录-2)
        - [详细分析result.html中的逻辑实现：](#详细分析resulthtml中的逻辑实现)
        - [各种交互、动画效果实现：](#各种交互动画效果实现)
  - [6.26晚上：](#626晚上)
      - [总结：](#总结)
        - [涉及到的基本技能：](#涉及到的基本技能)
        - [有趣的知识：](#有趣的知识)

# 记录
## 6.22上午：
* 重新找到加速器连上github，发现火狐浏览器对证书的检测比edge要严格（在火狐浏览器用wattToolkit加速github要手动安装证书）
## 6.23下午：
#### 完成功能：
* 主体功能：
  * 主页面，提供一段文字，然后将其显示在副页面中
  * 副页面，检测光标位置，当光标靠近时移动文字
* 需实现功能：
  * 从主页面提取的文本文字要每个作为一个元素，便于副页面进行操作
#### 学习记录：
##### index.html 代码详解
```html
<!DOCTYPE html> // 告诉浏览器这是一个HTML5文件 
<html lang="en"> // 在开始<html>同时设置语言为英文
<head> // 这里放一些页面的基本信息，其中重要的是css样式
    <meta charset="UTF-8"> // 设置字符编码
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    // 设置视图，让页面大小适应移动端
    <title>提交文本</title>
    <style> // 内联css样式
        body { // 主体文本
            display: flex; 
            // Flexbox是一种一维布局模式，可以轻松实现水平或垂直对齐。在这里，它用于将页面内容水平和垂直居中
            justify-content: center; // 主轴（默认水平）居中
            align-items: center; // 交叉轴（默认垂直）居中
            height: 100vh; // 设置页面的高度为视口高度的100%。确保内容填满视口
            margin: 0; // 外边距设置为0
            font-family: Arial, sans-serif; // 字体选择
        }
        .container { // 设置容器样式
            text-align: center; // 容器中的文本都居中
        }
        input[type="text"] { // 设置一个文本输入框
            width: 300px; // 宽度
            padding: 10px; // 内边距
            margin-bottom: 10px; // 底边距
        }
        input[type="submit"] { // 设置一个提交按钮
            padding: 10px 20px; // 上下、左右边距
        }
    </style>
</head>
<body>
    <div class="container"> // 创建一个容器
        <form action="result.html" method="GET"> // 创建一个表单元素，设置提交目标为result.html，提交方法为GET
            <input type="text" name="userInput" placeholder="请输入文本" required> // 创建一个文本输入框，设置类型为text，名称为userInput，占位符为“请输入文本”，并设置为必填
            <input type="submit" value="提交">
        </form>
    </div>
</body>
</html>
```
##### 表单 \<form> 知识扩展：
  * 基本结构：
```
    <form action="url" method="post/get">
    <!-- 表单内容 -->
    <input type="text" name="username" placeholder="请输入用户名">
    <input type="password" name="password" placeholder="请输入密码">
    <input type="submit" value="提交">
    </form>
```

  * action属性：指定表单提交的目标URL
  * method属性：指定表单数据的提交方法，如GET、POST
  * 表单控件：
    * 文本输入框（  \<input type="text">  ）
    * 密码输入框（  \<input type="password">  ）
    * 提交按钮（  \<input type="submit">  ）
    * 重置按钮（  \<input type="reset">  ）
    * 单选按钮（  \<input type="radio">  ）
    * 复选框（  \<input type="checkbox">  ）
    * 下拉选择框（  \<select>  ）
    * 文本域（  \<textarea>  ）
  * 表单验证：
    * required属性：指定输入框为必填项
    * pattern属性：指定输入框的正则表达式规则。如```<input type="text" name="phone" placeholder="请输入手机号" pattern="\d{11}" required>```
    * minlength  和  maxlength  属性：指定输入的最大最小长度
##### result.html 代码详解
```html
// 前面都一样，不管了
<body>
    <div class="container">
        <h1>您输入的文本是：</h1>
        <p id="result"></p> // 创建一个段落，设置ID为result，用于显示用户输入的文本。
        <script>
            const urlParams = new URLSearchParams(window.location.search); // 使用URLSearchParams获取URL中的查询参数，即获取URL中的查询字符串，例如 ?userInput=hello
            const userInput = urlParams.get('userInput'); // 从查询参数中获取 userInput 的值
            document.getElementById('result').innerText = userInput; // 将获取到的用户输入文本设置到ID为result的段落中。
        </script>
    </div>
</body>
</html>
```
##### document对象知识扩展：
document  是JavaScript中的一个全局对象，它表示当前加载的HTML文档。通过  document  对象，你可以访问和操作页面上的元素，执行各种操作，如修改内容、添加样式、绑定事件等。  document  对象是DOM（文档对象模型）的核心部分，DOM是HTML和XML文档的编程接口。
* document对象的基本方法：
  * document.getElementById(id)  ：通过id获得文档中的一个元素
  * document.getElementsByClassName(className) ：通过类名获得元素集合
  * document.getElementsByTagName(tagName)  ：通过标签获取元素集合
  * document.querySelector(selector)  ：通过css选择器获取第一个匹配的元素
  * document.querySelectorAll(selector)  ：css选择器获取所有元素
  * document.createElement(tagName)  ：创建一个元素
  * document.createTextNode(text)  ：创建一个新的文本结点
  * document.appendChild(node) ：将一个节点添加到指定节点的末尾
  * document.removeChild(node)  ：移除一个节点
  * document.replaceChild(newNode, oldNode)  ：替换节点
  * document.write(text)  ：向文档流中直接写内容
* document对象的常用属性：
  * document.title  ：获取或设置文档的标题
  * document.body ：获取文档的body元素
  * document.head ：获取文档的head元素
  * document.URL  ：获取当前文档的URL
  * document.domain  ：获取当前文档的域名
  * document.referrer  ：获取（返回到）链接到当前文档的URL
  * document.documentElement：获取当前文档的根元素\<html>
  * document.doctype  ：获取文档的类型声明
  * document.characterSet  ：获取文档的字符集
  * document.readyState  ：获取文档的加载状态。可能的值有  loading  、  interactive  、  complete  。
* document对象的事件：
  * DOMContentLoaded：在文档完全加载解析时触发
  ```
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
  });
    ```
  * load ：在所有依赖资源完全加载时触发
  ```
  window.addEventListener('load', function() {
    console.log('All resources are loaded');
  });
    ```
  * beforeunload  :在文档即将卸载时触发
  ```
  window.addEventListener('beforeunload', function(event) {
    event.preventDefault();
    event.returnValue = 'Are you sure you want to leave?';
  });
  ```
## 6.24下午：
#### 完成功能：
* 将一段文字平铺到页面
* 刚进入页面的淡出效果
* 鼠标附近的透明度变化效果
* 鼠标点击扩大半径效果
#### 学习记录：
##### result.html 更改代码详解：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="result.css"> -->
    <script src="result-anim.js"></script>
    <title>显示结果</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: auto; /* 允许滚动 */
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: flex-start; /* 顶部对齐 */
        }
        .char-container { // 设置字符容器，用于平铺文字
            display: grid; // 使用网格模式，通过设置网格间距完成平铺
            width: 100vw;
            grid-gap: 10px;
            justify-content: center;
            align-items: start;
        }
        .char { // 设置字体样式
            font-size: 24px; // 字体大小
            font-family: Arial, sans-serif; // font
            color: #333; // 字体颜色
            text-align: center; // 对齐方式
            display: flex; // flex对齐模式
            justify-content: center; // 主轴居中
            align-items: center; // 交叉轴居中
        }
    </style>
</head>
<body>
    <div class="char-container" id="charContainer"></div> // 创建一个字符容器，用于放置字符
    <script>
        // 获取URL参数
        const urlParams = new URLSearchParams(window.location.search);
        const userInput = urlParams.get('userInput') || ''; // 默认为空字符

        // 将用户输入的文本拆分成单个字符
        const characters = userInput.split('');

        // 获取字符容器
        const charContainer = document.getElementById('charContainer');

        // 固定字体大小
        const fontSize = 24; // px
        // 估算每个字符的宽高（可根据字体微调）
        const charWidth = fontSize * 0.6; // Arial 字体大致宽高比
        const charHeight = fontSize * 1.2;

        function render() {
            charContainer.innerHTML = '';
            const containerWidth = window.innerWidth;
            // 计算一行能放多少个字符
            const charWidthWithGap = charWidth + 10; // 10px gap
            const cols = Math.floor(containerWidth / charWidthWithGap) || 1;
            charContainer.style.gridTemplateColumns = `repeat(${cols}, ${charWidth}px)`;
            charContainer.style.gridGap = `10px`;
            // 把字符一个一个塞到div里面并作为 charElement 容器的子节点
            characters.forEach(char => {
                const charElement = document.createElement('div');
                charElement.classList.add('char');
                charElement.textContent = char;
                charContainer.appendChild(charElement);
            });
        }

        // 初始渲染
        render();
        // 窗口大小变化时重新渲染
        window.addEventListener('resize', render);
    </script>
</body>
</html>
```
## 6.25下午：
#### 学习记录：
##### 详细分析result.html中的逻辑实现：
```html
<script>
        // 获取URL参数
        const urlParams = new URLSearchParams(window.location.search);
        const userInput = urlParams.get('userInput') || ''; // 默认为空字符
        // 将用户输入的文本拆分成单个字符
        const characters = userInput.split('');
        // 获取字符容器
        const charContainer = document.getElementById('charContainer');
        // 固定字体大小
        const fontSize = 24; // px
        // 估算每个字符的宽高（可根据字体微调）
        const charWidth = fontSize * 0.6; // Arial 字体大致宽高比
        const charHeight = fontSize * 1.2;
        function render() {
            charContainer.innerHTML = '';
            const containerWidth = window.innerWidth;
            // 计算一行能放多少个字符
            const charWidthWithGap = charWidth + 10; // 10px gap
            const cols = Math.floor(containerWidth / charWidthWithGap) || 1;
            charContainer.style.gridTemplateColumns = `repeat(${cols}, ${charWidth}px)`;
            charContainer.style.gridGap = `10px`;
            // 把字符一个一个塞到div里面并作为 charElement 容器的子节点
            characters.forEach(char => {
                const charElement = document.createElement('div');
                charElement.classList.add('char');
                charElement.textContent = char;
                charContainer.appendChild(charElement);
            });
        }
        // 初始渲染
        render();
        // 窗口大小变化时重新渲染
        window.addEventListener('resize', render);
    </script>
```
* 获取所有文本和之前所用的方法是一样的，用 URLSearchParams(window.location.search) 获取到get传递的参数，然后用 .get("userInput") 得到具体参数。这里给文本默认为空
* .split('') 方法用于拆分单个字符
* 把charContainer对象找出来，后面要用
* 渲染函数：
  * window.innerWidth 方法直接获取窗口宽度
  * 用字体宽度加上一定的字间距，然后计算一行能放多少字符
  * 设置charContainer对象：.style.gridTemplateColunms 设置列格式，用 repeat()进行设置。其中第一个参数 ${cols} 指重复次数，即列数；第二个参数 ${charWidth} 表示每一列的宽度。**这样调整了容器的格式，后面只需要把文字再挨个放回来就行了**
  * 对每一个字符创建一个 div，然后用 .classList.add() 方法给div一个类名char，**这样就能应用预设的char的css样式**。再把字符放到div里，然后把div作为子元素加到容器里。
* 初始调用一次渲染函数，然后每当检测到窗口大小变化时重新渲染一次
##### 各种交互、动画效果实现：
```js
window.onload = function() {
    const container = document.getElementById('charContainer');
    const chars = Array.from(container.children); // 拿到所有字，放到数组里
    const baseRadius = 200; // 初始半径
    let radius = baseRadius; // 当前半径初始化为初始半径
    let globalOpacity = 1; // 整体透明度

    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    // 计算并设置每个字符的透明度
    function updateAllOpacity(mouseX, mouseY) {
        chars.forEach(char => {
            const rect = char.getBoundingClientRect(); // rect是一个包含元素左边界距视口的水平距离、上边界距视口的垂直距离；元素宽度、高度的对象
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;
            // 上面两行计算元素的中心点，用于后续计算距离
            const dist = Math.sqrt((charX - mouseX) ** 2 + (charY - mouseY) ** 2);
            let opacity;
            if (dist <= radius) {
                const t = dist / radius; // 用于做到渐变效果
                opacity = globalOpacity * t + (1 - t) * 1;
            } else {
                opacity = globalOpacity;
            }
            char.style.opacity = opacity; // 可以直接对文字的透明度进行设置
        });
    }

    // 整体淡出动画
    function startGlobalFade() {
        const duration = 5000; // 5秒
        const start = Date.now(); // 记录动画的开始时间为当前时间戳
        function fade() {
            const elapsed = Date.now() - start; // 计算从动画开始到当前时间经过的时间
            globalOpacity = Math.max(1 - elapsed / duration, 0); // 通过上一行得到的与时间有关的线性变量，计算透明度
            updateAllOpacity(lastMouseX, lastMouseY); // 保持鼠标相关的透明度逻辑正常运转
            if (globalOpacity > 0) {
                requestAnimationFrame(fade); // 如果透明度大于0，则递归运行，达成动画效果
            }
        }
        fade();
    }

    // 鼠标移动时更新，添加鼠标移动事件，然后更新鼠标坐标并更新透明度相关信息
    document.addEventListener('mousemove', e => {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        updateAllOpacity(lastMouseX, lastMouseY);
    });

    // 半径缩小动画
    let shrinking = false; // 当前半径是否在缩小的标志
    function shrinkRadius() {
        if (radius > baseRadius) {
            shrinking = true;
            radius -= 5; // 缩小速度，可调整
            if (radius < baseRadius) radius = baseRadius;
            // 缩小逻辑
            updateAllOpacity(lastMouseX, lastMouseY);
            // 更改半径伴随透明度更改
            requestAnimationFrame(shrinkRadius);
            // 递归调用，将半径缩小至最小
            // requestAnimationFrame 是一个浏览器API，用于调度下一次重绘，确保动画平滑且性能优化。
        } else {
            shrinking = false;
        }
    }

    // 鼠标点击事件（左键、右键）
    document.addEventListener('mousedown', function(e) {
      // 这里将事件的结果直接给了匿名方法，即直接给到参数e，然后匿名方法根据参数e做修改
      // 修改都很简单
        if (e.button === 0 || e.button === 2) { // 左键或右键
            radius += 150; // 每次点击增大多少，可调整
            if (radius > 2000) {
                radius = 2000
            }
            updateAllOpacity(lastMouseX, lastMouseY);
        }
    });

    // 鼠标松开时开始缩小
    document.addEventListener('mouseup', function(e) {
        if (!shrinking) {
            shrinkRadius();
        }
    });

    // 防止右键弹出菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // 初始渲染
    updateAllOpacity(lastMouseX, lastMouseY);

    // 启动整体淡出动画
    startGlobalFade();
};
```
## 6.26晚上：
#### 总结：
##### 涉及到的基本技能：
* html基本语法以及内联css样式的使用：
  * 表单（form）的使用
  * 如何操作一个网页（对document对象的操作）
* 一些简单的js脚本的制作：
  * 将单个文字作为处理对象，调整其大小以填充满整个页面
  * 简单的动画效果实现（逐渐变透明）
  * 检测鼠标点击、鼠标移动、窗口大小变化而进行反应等事件的实现
##### 有趣的知识：
* 在实现透明度计算的逻辑时，有两个函数同时发生。
  * 第一个是最开始只进行一次的逐渐变透明效果，这是一个随时间负相关的线性函数，可以简单表示为 Op1（透明度）= 1 - kt（时间）。
  * 而第二个函数是和指针位置半径负相关的函数，可以表示为 Op2 = 1 - dist（与光标距离） / r（半径） 
  * 要同时实现这两个逻辑，尝试找到一个表达式综合这两个式子，逻辑上可以理解为 Op = Op1 + Op2
  * 这里用了两个比较巧妙的方法，把 t 和 d 相关的量都控制在 [0,1] 内，然后就可以用 1 - t'd' 表示Op。（其实是线性差值