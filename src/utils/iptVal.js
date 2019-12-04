import axios from 'axios'
let url = 'http://192.168.1.253:30001/open/1.0'

function search_box(net, input, props) {
    console.log(props, 'props....')
    input = ("" + input).replace(/(^\s*)|(\s*$)/g, "");
    let re = /^[0-9]*$/;
    if (re.test(input)) {
        console.log(input * 1, 'height')
        props.history.push('/app/dealBox/' + input * 1)
    } else if (input.length == 64) {
        console.log(input, 'hash')
        axios.get('http://wallet.violas.io/address_info2/?address=' + input).then(res => {
            console.log(res.data)
            props.history.push('/app/addressBox/' + input)
        })
    }
}
export default search_box;
