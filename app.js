let roughSvg = rough.svg(document.getElementById('svg'));

var clockContainer = document.getElementById("svgContainer");

var clockNumbersContainer = document.getElementById("clockNumbers");

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

(function initializeClockNumbersPos ()
{
    let numbers = document.querySelectorAll('.numbers');

    for (let i = 0; i < 12; i++)
    {
        let number = numbers[i];
        number.textContent = `${i + 1}`;

        let bbox = number.getBBox();

        const angle = toRadians((i - 2) * (360 / 12)); // - 2 is the offset to start from 1, not 3
        const radius = __clockDiameter / 2 * 0.8;

        number.setAttribute("x", __clockCenterX + radius * Math.cos(angle) - bbox.width / 2);
        number.setAttribute("y", __clockCenterY + radius * Math.sin(angle) + bbox.height / 2);
    }
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
        clockHand.line.setAttribute('transform', `rotate(${seconds / clockHand.ratio * 360 % 360}, ${__clockCenterX} ${__clockCenterY})`);
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

function toRadians(degrees)
{
    return degrees * (Math.PI / 180);
}

// console.log('odleglosc miedzy cyframi na tarczy: ', 150/Math.sin(toRadians(75))*Math.sin(toRadians(30))); //dla d=300 wynosi 77

// function drawNumbers()
// {
//     for (let i = 1; i < 13; i++)
//     {
//         var number = document.createElement('text');

//         number.textContent = `${i}`;
//         number.setAttribute("font-family", "Arial");
//         number.setAttribute("font-size", "24");
//         number.setAttribute('x', __clockCenterX + 200);
//         number.setAttribute('y', __clockCenterY);
//         number.setAttribute('fill', 'black')

//         clockNumbersContainer.appendChild(number);
//         clockContainer.appendChild(clockNumbersContainer);
//     }
// }

// drawNumbers();