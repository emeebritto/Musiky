const urlBase = process.env.NODE_ENV 
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const getTime = () => {
    return new Date().getHours();
}

const greeting = () => {
    let time = getTime();
    //if(!process.env.DEV_ENV) time = time -3;
    if(time < 0){time = time + 24}

    const period = [
        {'Good Night': time >= 20 && time <= 23 || time >= 0 && time < 5},
        {'Good Morning': time >= 5 && time < 12},
        {'Good Afternoon': time >= 12 && time < 18},
        {'Good Evening': time >= 18 && time <= 19}
    ]

    let firstIndexSameTrue = period.findIndex(value => Object.values(value)[0] == true);
    let greetingText = Object.keys(period[firstIndexSameTrue])[0]

    let imgRandom = ~~(Math.random() * 3);

    filePath = `period/1${firstIndexSameTrue}4/${imgRandom}2.gif`

    obj = {
        time,
        greetingText: greetingText,
        greetingImg: `${urlBase}/static/imgs/${filePath}`
    }

    return obj
}

module.exports = greeting
