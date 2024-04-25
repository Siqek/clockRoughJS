let roughSvg = rough.svg(document.getElementById('svg'));

var clock = document.getElementById("svgContainer");

const __clockCenterX    = clock.offsetWidth / 2;
const __clockCenterY    = clock.offsetHeight / 2;
const __clockDiameter   = 300;

const clockHands = Object.freeze([
    {
        name: 'second hand',
        chLenght    : 140,
        ratio       : 60,   //total number of seconds for a full rotation
        line        : null,
        initLine    : function () {
            this.line = roughSvg.line(__clockCenterX, __clockCenterY, __clockCenterX, __clockCenterY - this.chLenght)
        }
    },
    {
        name: 'minute hand',
        chLenght    : 110,
        ratio       : 60 * 60,
        line        : null,
        initLine    : function () {
            this.line = roughSvg.line(__clockCenterX, __clockCenterY, __clockCenterX, __clockCenterY - this.chLenght)
        }
    },
    {
        name: 'hour hand',
        chLenght    : 80,
        ratio       : 12 * 60 * 60,
        line        : null,
        initLine    : function () {
            this.line = roughSvg.line(__clockCenterX, __clockCenterY, __clockCenterX, __clockCenterY - this.chLenght)
        }
    }
]);

(function initializeClockShape()
{
    drawCircle(__clockCenterX, __clockCenterY, __clockDiameter);
    drawCircle(__clockCenterX, __clockCenterY, (__clockDiameter / 50));
})();

(function initializeClockHands()
{
    clockHands.forEach(clockHand => {
            clockHand.initLine();
            svg.appendChild(clockHand.line);
    })
})();

(function initializeInterval()
{
    setInterval(() => {
        const date = new Date();
        const seconds = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 60 * 60;
        clockHands.forEach(clockHand => {
            clockHand.line.setAttribute('transform', `rotate(${seconds / clockHand.ratio * 360}, ${__clockCenterX} ${__clockCenterY})`);
        })
    }, 1000)
})();

function drawCircle(x, y, diameter)
{
    const circle = roughSvg.circle(x, y, diameter, {
        fill: 'rgba(0, 0, 0, 0.2)',
        fillStyle: 'solid'
    });

    svg.appendChild(circle);
}