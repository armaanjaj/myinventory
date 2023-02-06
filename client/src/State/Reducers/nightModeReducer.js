const reducer = (
    state = {
        bgNavbar: "#b1fcff",
        bgCard: "#ffffffd6",
        colorNavbar: "#000000",
        colorCard: "#000000",
    },
    action
) => {
    if (action.payload === true) {
        return {
            bgNavbar: "#001819d6",
            bgCard: "#2c2c2cd6",
            colorNavbar: "#b1fcff",
            colorCard: "#ffffff",
        };
    } else if (action.payload === false) {
        return {
            bgNavbar: "#b1fcff",
            bgCard: "#ffffffd6",
            colorNavbar: "#000000",
            colorCard: "#000000",
        };
    } else {
        return state;
    }
};

export default reducer;
