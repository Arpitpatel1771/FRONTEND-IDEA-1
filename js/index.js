const dataStore = {
    delayedOpacityChangeFunctions: [],
    cursor: {
        hue: 265
    }
}

document.addEventListener("DOMContentLoaded", () => {
    main()
});

function main() {
    initializeCustomCursor()
}

function lg() {
    console.log(...arguments)
}

function initializeCustomCursor() {
    const cursorElements = document.getElementsByClassName("custom-cursor")
    const cursors = Array.prototype.slice.call( cursorElements )
    cursors.reverse()

    document.addEventListener('mousemove', e => {
        const constMainWidth = "2"
        const constMainLuminance = 30
        let counter = 0

        for (let cursor of cursors) {
            cursor.style.width = `${constMainWidth - counter * 0.08}em`
            cursor.style.backgroundColor = `hsl(${dataStore.cursor.hue}, 50%, ${constMainLuminance + counter * 2}%)`
            counter += 1
        }

        counter = 0
        let animationStagger = 10
        for (let timeoutFunction of dataStore.delayedOpacityChangeFunctions) {
            clearTimeout(timeoutFunction)
        }
        dataStore.delayedOpacityChangeFunctions = []
        for (let cursor of cursors) {
            cursor.style.opacity = 1

            const x = e.clientX - cursor.offsetWidth / 2;
            const y = e.clientY - cursor.offsetHeight / 2;

            const keyframes = {
                transform: `translate(${x}px, ${y}px)`
            }
    
            cursor.animate(keyframes, {
                duration: 600,
                fill: "forwards",
                delay: counter + animationStagger
            });

            let timeoutFunction = setTimeout(()=>{cursor.style.opacity = 0;}, 900 + counter)
            dataStore.delayedOpacityChangeFunctions = [...dataStore.delayedOpacityChangeFunctions, timeoutFunction]
            
            counter += animationStagger
        }

        // if (dataStore.delayedOpacityChange) {
        //     clearTimeout(dataStore.delayedOpacityChange)
        // }

        // cursor.style.opacity = 1

        // const x = e.clientX - cursor.offsetWidth / 2;
        // const y = e.clientY - cursor.offsetHeight / 2;

        // const keyframes = {
        //     transform: `translate(${x}px, ${y}px)`
        // }

        // cursor.animate(keyframes, {
        //     duration: 800,
        //     fill: "forwards",
        // });

        // dataStore.delayedOpacityChange = setTimeout(()=>{cursor.style.opacity = 0}, 900)
    });
}