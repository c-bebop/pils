var Point = function(x, y) {
    this.x = x;
    this.y = y;
};

var Vector = function(start, end) {
    this.start = start;
    this.end = end;
    this.length = function() { return Math.sqrt(Math.pow(this.end.x - this.start.x, 2) + Math.pow(this.end.y - this.start.y, 2)); }
};

var Calculator = function(marginOfError, approximateValue, canvas, colorCircle, colorSquare, initialColor) {

    this.circlePoints = 0;
    this.squarePoints = 0;
    this.totalPoints = function() { return this.circlePoints + this.squarePoints; }
    this.marginOfError = marginOfError;
    this.approximateValue = approximateValue;
    this.realDeviation = function() { return Math.abs(Math.PI - this.approximateValue); }
    this.currentMarginOfError = 0;
    this.center = new Point(0.5, 0.5);
    this.randomPoint = new Point(0.0, 0.0);
    this.vector = new Vector(this.center, this.randomPoint);

    this.createRandomPoint = function(point) {
        point.x = Math.random();
        point.y = Math.random();
    };

    this.calculateProgress = function() {
        return Math.min(100, this.marginOfError / this.currentMarginOfError * 100);
    };

    this.calculate = function(margin) {

        while (Math.abs(Math.PI - this.approximateValue) >= margin) {
            this.createRandomPoint(this.randomPoint);
            this.vector.end = this.randomPoint;

            if (this.vector.length() <= 0.5) {
                this.circlePoints++;
            } else {
                this.squarePoints++;
            }

            this.approximateValue = (4.0 * this.circlePoints) / this.totalPoints();
        }

        this.currentMarginOfError = this.currentMarginOfError = Math.abs(Math.PI - this.approximateValue);;

        return this.approximateValue;
    };

    this.benchmark = function(margin, recursive) {
        this.clear();
        this.marginOfError = margin;

        if (recursive) {
            this.recursiveApproach();
        } else {
            this.calculate(margin);
        }
    };

    this.recursiveApproach = function() {

        if (Math.abs(Math.PI - this.approximateValue) >= this.marginOfError) {
            this.createRandomPoint(this.randomPoint);
            this.vector.end = this.randomPoint;

            if (this.vector.length() <= 0.5) {
                this.circlePoints++;
            } else {
                this.squarePoints++;
            }

            this.approximateValue = (4.0 * this.circlePoints) / this.totalPoints()
            this.recursiveApproach();
        } else {
            this.currentMarginOfError = Math.abs(Math.PI - this.approximateValue);
        }

    };

    this.calculateStep = function() {

        this.createRandomPoint(this.randomPoint);
        this.vector.end = this.randomPoint;

        if (this.vector.length() <= 0.5) {
            canvas.drawRelativePoint(this.randomPoint, 3, colorCircle);
            this.circlePoints++;
        } else {
            canvas.drawRelativePoint(this.randomPoint, 3, colorSquare);
            this.squarePoints++;
        }

        this.approximateValue = (4.0 * this.circlePoints) / (this.squarePoints + this.circlePoints);
    };

    this.makeFrame = function(interval, margin) {

        this.marginOfError = margin;
        this.currentMarginOfError = Math.abs(Math.PI - this.approximateValue);

        if (this.currentMarginOfError >= this.marginOfError) {
            this.calculateStep();
            return false;
        }

        clearInterval(interval);
        return true;

    };

    this.clear = function() {
        this.circlePoints = 0;
        this.squarePoints = 0;
        this.currentMarginOfError = 0;
        this.randomPoint = new Point(0.0, 0.0);
        this.vector = new Vector(this.center, this.randomPoint);
        this.approximateValue = 0;
    }

};