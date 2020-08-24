function search_violas(input, props) {
    // console.log(props, 'props....')
    input = ("" + input).replace(/(^\s*)|(\s*$)/g, "");
    let re = /^[0-9]*$/;
    if (re.test(input)) {
        // console.log(input * 1, 'height')
        props.history.push('/app/Violas_version/' + input * 1)
    } else if (input.length === 32) {
        // console.log(input, 'hash')
        props.history.push('/app/Violas_address/' + input)
    }
}
export default search_violas;