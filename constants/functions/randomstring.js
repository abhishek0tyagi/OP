const make24digit = async () =>{
    console.log("inside makae24digit");
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let combination = '';

    for (let i = 0; i < 24; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        combination += characters.charAt(randomIndex);
    }

    return combination;
}

module.exports = { make24digit };