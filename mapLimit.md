

const images = [
    "image1",
    "image2",
    "image3",
    "image4",
    "image5",
    "image6",
    "image7",
    "image8",
    "image9",
]

async function uploadImages(image, index) {
    console.log(`🚀 Uploading ${image} (index: ${index})`);
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log(`✅ Done ${image}`);
            resolve(`✅uploaded ${image}`)
        }, 1500)
    })
}

function mapLimit(images, limit, fn) {
    let currentIndex = 0
    let inFlight = 0
    let results = Array(images.length).fill(null)


    return new Promise((resolve, reject) => {
        function launchNext() {
            if (currentIndex >= images.length && inFlight === 0) {
                resolve(results)
            }
            while (currentIndex < images.length && inFlight < limit) {
                const index = currentIndex
                const image = images[index]

                currentIndex++
                inFlight++
                Promise.resolve(fn(image, index)).then(res => {
                    results[index] = res
                    inFlight--
                    launchNext()
                })
            }
        }
         launchNext()
    })


}

mapLimit(images, 3, uploadImages).then(res => {
    console.log("🎉 All done:", res);
})