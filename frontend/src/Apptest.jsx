
import './App.css'
import Test from './components/Test'
import Counter from '../src/components/Test/Counter'
import Alert from './components/Test/Alert'


function App(){
    return(
        <>
        <div className='text-center'>
                <Counter/>
                <Alert></Alert>
        </div>
        </>
    )
}

export default App