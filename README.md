# letWordsGoAway
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