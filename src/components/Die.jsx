export default function Die(props) {
    return (
        <button
            className={`aspect-square rounded-lg border text-2xl font-black leading-none shadow-[0_3px_0_rgba(24,35,45,0.16)] transition duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16877e] sm:text-3xl ${props.isHeld ? 'border-[#16877e] bg-[#c9f0e8] text-[#075f59] shadow-[0_3px_0_#16877e]' : 'border-[#dce3e8] bg-[#f9fbfc] text-[#18232d] hover:-translate-y-0.5 hover:border-[#9fcfc9] hover:bg-[#effaf8]'}`}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}
