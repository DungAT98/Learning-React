const ControlHelper = {
    onChangeInputHandler: (event, dispatchState) => {
        dispatchState(event.target.value);
    }
}

export default ControlHelper;
