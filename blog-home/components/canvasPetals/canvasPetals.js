import { useEffect, useRef, useState } from "react";
import styles from './canvas.module.css'

const CanvasPetals = () => {
  const canvasRef = useRef(null);
  const [petalCount, setPetalCount] = useState(44);
  useEffect(() => {
    const handleResize = () => {
      // 当窗口宽度小于 750px 时，调整花瓣数量为 15
      if (window.innerWidth < 750) {
        setPetalCount(10);
      } else {
        setPetalCount(44); // 否则数量为 100
      }
    };

    window.addEventListener('resize', handleResize);

    // 初始时调用一次，以便加载时根据窗口大小调整花瓣数量
    handleResize();

    // 清理事件监听
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 设置 Canvas 尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // const petalCount = 44;

    // 创建花瓣数组
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      radius: Math.random() * 3 + 5, // 花瓣大小
      speedY: Math.random() * 2 + 0.5,  // 垂直速度
      speedX: Math.random() * 1 + 1,  // 水平速度
      angle: Math.random() * 360,     // 旋转角度
      angularSpeed: Math.random() * 2 - 1, // 旋转速度
    }));

    // 绘制单个花瓣
    function drawPetal({ x, y, radius, angle }) {
        ctx.save();
        ctx.translate(x, y);                    // 移动到花瓣中心
        ctx.rotate((angle * Math.PI) / 180);    // 旋转花瓣

        ctx.globalAlpha = 0.7
    
        // 创建线性渐变（从花瓣顶部到底部）
        const gradient = ctx.createLinearGradient(-radius * 1.5, 0, radius * 1.5, 0);
        gradient.addColorStop(0, "pink");       // 花瓣左侧为粉色
        gradient.addColorStop(1, "white");      // 花瓣右侧为白色
    
        // 绘制椭圆形花瓣
        ctx.fillStyle = gradient;
        ctx.shadowColor = "rgba(255, 182, 193, 0.5)"; // 粉色阴影
        ctx.shadowBlur = 10;                     // 模糊效果
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.5, radius, 0, 0, Math.PI * 2);
        ctx.fill();
    
        ctx.restore();
    }

    // 更新花瓣状态
    function updatePetal(petal) {
      petal.y += petal.speedY; // 向下移动
      petal.x -= petal.speedX; // 向左移动
      petal.angle += petal.angularSpeed; // 旋转花瓣

      // 如果花瓣超出屏幕，重新生成
      if (petal.y > canvas.height || petal.x < 0) {
        petal.y = Math.random() * canvas.height - canvas.height;
        petal.x = Math.random() * canvas.width + canvas.width;
      }
    }

    // 动画循环
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal) => {
        drawPetal(petal);
        updatePetal(petal);
      });

      requestAnimationFrame(animate);
    }

    animate();

    // 窗口大小变化时调整 Canvas 尺寸
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [petalCount]);

  return <canvas className={ styles.canvas } ref={canvasRef} style={{ display: "block"}} />;
};

export default CanvasPetals;
