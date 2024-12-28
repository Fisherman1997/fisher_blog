import { useEffect, useRef } from "react";
import styles from '../Footer.module.css'

const WaveCanvas = () => {
  const canvasRef = useRef(null);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 设置初始 Canvas 尺寸
    canvas.width = window.innerWidth - 10;
    canvas.height = 60;
    
    // 波浪层参数
    const waveLayers = [
      { waveHeight: 20, waveLength: 0.02, waveSpeed: 0.05, color: 'rgba(255, 255, 255, 0.6)' },  // 第一层波浪
      { waveHeight: 15, waveLength: 0.025, waveSpeed: 0.03, color: 'rgba(255, 255, 255, 0.4)' },  // 第二层波浪
      { waveHeight: 10, waveLength: 0.03, waveSpeed: 0.01, color: 'rgba(255, 255, 255, 0.2)' }   // 第三层波浪
    ];

    let offset = [0, 100, 200]; // 每层波浪的偏移量

    // 绘制波浪
    function drawWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布

      // 绘制每一层波浪
      waveLayers.forEach((layer, index) => {
        ctx.strokeStyle = layer.color; // 设置波浪颜色
        ctx.lineWidth = 2; // 波浪线宽

        ctx.globalAlpha = 0.4

        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2); // 起始点为画布中间

        // 使用正弦函数绘制波浪
        for (let x = 0; x <= canvas.width; x++) {
          const y = canvas.height / 2 + layer.waveHeight * Math.sin(x * layer.waveLength + offset[index]);
          ctx.lineTo(x, y);
        }

        ctx.stroke(); // 绘制波浪
      });

      // 更新每层波浪的偏移量，让波浪看起来在动
      offset = offset.map(o => o + waveLayers[0].waveSpeed); 

      requestAnimationFrame(drawWave); // 请求下次动画
    }

    drawWave();

    // 窗口大小变化时调整 Canvas 尺寸
    // const handleResize = () => {
    //   canvas.width = window.innerWidth;
    // };

    // window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  return <canvas className={ styles.waveCanvas } ref={canvasRef} style={{ display: "block"}} />;
};

export default WaveCanvas;
