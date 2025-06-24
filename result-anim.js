window.onload = function() {
    const container = document.getElementById('charContainer');
    const chars = Array.from(container.children);
    const baseRadius = 200; // 初始半径
    let radius = baseRadius;
    let globalOpacity = 1; // 整体透明度

    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    // 计算并设置每个字符的透明度
    function updateAllOpacity(mouseX, mouseY) {
        chars.forEach(char => {
            const rect = char.getBoundingClientRect();
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;
            const dist = Math.sqrt((charX - mouseX) ** 2 + (charY - mouseY) ** 2);
            let opacity;
            if (dist <= radius) {
                const t = dist / radius;
                opacity = globalOpacity * t + (1 - t) * 1;
            } else {
                opacity = globalOpacity;
            }
            char.style.opacity = opacity;
        });
    }

    // 整体淡出动画
    function startGlobalFade() {
        const duration = 5000; // 5秒
        const start = Date.now();
        function fade() {
            const elapsed = Date.now() - start;
            globalOpacity = Math.max(1 - elapsed / duration, 0);
            updateAllOpacity(lastMouseX, lastMouseY);
            if (globalOpacity > 0) {
                requestAnimationFrame(fade);
            }
        }
        fade();
    }

    // 鼠标移动时更新
    document.addEventListener('mousemove', e => {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        updateAllOpacity(lastMouseX, lastMouseY);
    });

    // 半径缩小动画
    let shrinking = false;
    function shrinkRadius() {
        if (radius > baseRadius) {
            shrinking = true;
            radius -= 5; // 缩小速度，可调整
            if (radius < baseRadius) radius = baseRadius;
            updateAllOpacity(lastMouseX, lastMouseY);
            requestAnimationFrame(shrinkRadius);
        } else {
            shrinking = false;
        }
    }

    // 鼠标点击事件（左键、右键）
    document.addEventListener('mousedown', function(e) {
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