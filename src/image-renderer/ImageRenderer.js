import React, { Component } from 'react';

export default class ImageRenderer extends Component {
  state = {
    isRendered: false,
    isRendering: false
  }

  componentDidMount() {
    this.updateCanvasRender();
  }

  componentDidUpdate() {
    this.updateCanvasRender();
  }

  canvasRef = null;

  updateCanvasRender() {
    const { image } = this.props;

    if (image.getNeedsRender()) {
      this.setState({
        isRendered: false,
        isRendering: true
      });
      image.setRendering();

      const imageData = image.getData();

      const ctx = this.canvasRef.getContext('2d');

      const height = image.getRenderHeight();
      const width = image.getRenderWidth();

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < height * width; i ++) {
        const pixelIndex = i * 4;
        ctx.fillStyle = `rgba(${imageData[pixelIndex]}, ${imageData[pixelIndex + 1]}, ${imageData[pixelIndex + 2]}, ${imageData[pixelIndex + 3] / 255})`;
        ctx.fillRect(i % width, Math.floor(i / width), 1, 1);
      }

      console.log('Canvas render updated.');

      image.setRendered();
      this.setState({
        isRendering: true,
        isRendered: true
      });
    }
  }

  render() {
    const { image } = this.props;
    const { isRendered } = this.state;

    return (
      <div className="svgee-image-renderer">
        {!isRendered && <p>Building Image...</p>}
        <canvas
          height={image.getRenderHeight()}
          ref={ref => {this.canvasRef = ref;}}
          width={image.getRenderWidth()}
        />
      </div>
    );
  }
}
