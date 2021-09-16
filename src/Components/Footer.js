import React from 'react'

const Footer = () => {
    const footerStyle={
        position: "fixed",
        width: "100%",
        left: "0",
        bottom: "0",
        backgroundColor: "black",
        color: "white",
        textAlign: "center"
    }
    return (
        <div>
                       <footer style={footerStyle}>
	<p>Copyright &copy; 2021 GTX Technologies</p>
</footer>
        </div>
    )
}

export default Footer
