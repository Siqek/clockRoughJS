let roughSvg = rough.svg(document.getElementById('svg'));

var clockContainer = document.getElementById("svgContainer");

var clockNumbersContainer = document.querySelector("#clockNumbers");

const __clockCenterX    = clockContainer.offsetWidth / 2;
const __clockCenterY    = clockContainer.offsetHeight / 2;
const __clockDiameter   = 300;

const __initLine = function () {
    this.line = roughSvg.line(__clockCenterX, __clockCenterY, __clockCenterX, __clockCenterY - this.chLenght, { strokeWidth: 2 })
}

const clockHands = Object.freeze([
    {
        name: 'second hand',
        chLenght    : 140,
        ratio       : 60,   //total number of seconds for a full rotation
        line        : null,
        initLine    : __initLine
    },
    {
        name: 'minute hand',
        chLenght    : 110,
        ratio       : 60 * 60,
        line        : null,
        initLine    : __initLine
    },
    {
        name: 'hour hand',
        chLenght    : 80,
        ratio       : 12 * 60 * 60,
        line        : null,
        initLine    : __initLine
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
    });
    updateClockHands();
})();

(function initializeInterval()
{
    setInterval(() => { updateClockHands() }, 1000)
})();

function updateClockHands()
{
    const date = new Date();
    const seconds = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 60 * 60;
    clockHands.forEach(clockHand => {
        clockHand.line.setAttribute('transform', `rotate(${seconds / clockHand.ratio * 360}, ${__clockCenterX} ${__clockCenterY})`);
    });
}

function drawCircle(x, y, diameter)
{
    const circle = roughSvg.circle(x, y, diameter, {
        fill: 'rgba(0, 0, 0, 0.2)',
        fillStyle: 'solid'
    });

    svg.appendChild(circle);
}

// function toRadians(degrees)
// {
//     return degrees * (Math.PI / 180);
// }

// console.log('odleglosc miedzy cyframi na tarczy: ', 150/Math.sin(toRadians(75))*Math.sin(toRadians(30)));

function drawNumbers()
{
    for (let i = 1; i < 13; i++)
    {
        var number = document.createElement('text');

        number.textContent = `${i}`;
        number.setAttribute("font-family", "Arial");
        number.setAttribute("font-size", "24");
        number.setAttribute('x', __clockCenterX + 200);
        number.setAttribute('y', __clockCenterY);

        clockNumbersContainer.appendChild(number);
    }
}

drawNumbers();