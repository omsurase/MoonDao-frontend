import React from 'react'

function tokentransfer() {
    const [TokenAmount, setTokenAmount] = useState("");
    return (
        <div>
            <input type="text" placeholder="Token amount" className="input input-bordered w-full max-w-xs" onChange={(e) => setTokenAmount(e.target.value)} />

        </div>
    )
}

export default tokentransfer
