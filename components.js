var displaySlider = function(slider) {

    var value = slider.querySelector('div');
    var input = slider.querySelector('input');

    input.onchange = function(e) {
        value.innerHTML = input.value;
    };

};

var getSliderValue = function(slider) {
    return parseFloat(slider.querySelector('div').innerHTML);
};

var displayPrompt = function(prompt, value) {
    prompt.innerHTML = value;
};

var displayMeasurePrompts = function(calculator) {
    displayPrompt(document.getElementById('approximate'), calculator.approximateValue);
    displayPrompt(document.getElementById('errorMargin'), calculator.marginOfError);
    displayPrompt(document.getElementById('currentErrorMargin'), calculator.currentMarginOfError);
    displayPrompt(document.getElementById('points'), calculator.totalPoints());
};

var displayProgressBar = function(progressBar, progressBarValue) {
    progressBarValue =  Number((progressBarValue).toFixed(1));
    progressBar.setAttribute('aria-valuenow', progressBarValue.toString());
    progressBar.setAttribute('style', 'width: ' + progressBarValue.toString() + '%;');
    progressBar.innerHTML = progressBarValue.toString() + '%';
};

var Canvas = function(canvasElement, width, height, backgroundColor) {
    this.canvas = canvasElement;
    this.width = width;
    this.height = height;
    this.context = this.canvas.getContext('2d');
    this.canvas.setAttribute('width', this.width.toString());
    this.canvas.setAttribute('height', this.height.toString());

    this.drawPoint = function(x, y, radius, fillStyle) {
        this.context.beginPath();
        this.context.fillStyle = fillStyle;
        this.context.arc(x, y, radius, 0, Math.PI*2, true);
        this.context.fill();
    };

    this.drawRelativePoint = function(point, radius, fillStyle) {
        this.drawPoint(point.x * this.width, point.y * this.height, radius, fillStyle);
    };


    this.setBackground = function(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, width, height);
    };

    this.setBackground(backgroundColor);

    this.clear = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.setBackground(backgroundColor);
    };
};

