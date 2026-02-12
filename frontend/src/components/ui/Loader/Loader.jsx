import { TailSpin } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='load-spinner'>
            <TailSpin
                height="40"
                width="40"
                color="#f7931e"
                ariaLabel="tail-spin-loading"
                visible={true}
            />
        </div>
    )
}

export default Loader