import './work.scss'

function Work() {
    return (
        <div className='work-container'>
            <div className='mini-container'>
                <img className='budget' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/Budget_thing.png' alt='Budget' />
                <h1>Give Us Your Budget</h1>
                <div>Tell us how much you want to spend and customize your departure and arrival dates.</div>
            </div>
            <img className='arrow' src='https://cdn.discordapp.com/attachments/801884180879376405/806242899720404992/arrow-40163_960_720.webp' alt='Arrow'/> 
            <div className='mini-container'>
                <img src='https://colab-image-assets.s3-us-west-1.amazonaws.com/map.png' alt='Map'/>
                <h1>Explore the Map & Destinations</h1>
                <div>Look at our map and you will be surprised how far your budget can take you.</div>
            </div>
            <img className='arrow' src='https://cdn.discordapp.com/attachments/801884180879376405/806242899720404992/arrow-40163_960_720.webp' alt='Arrow'/> 
            <div className='mini-container'>
                <img src='https://colab-image-assets.s3-us-west-1.amazonaws.com/Airplane_silhouette.svg' alt='Plane'/>
                <h1>See Your Best Flights</h1>
                <div>We will show you the cheapest flight we found from comparing thousands of flights.</div>
            </div>
            <img className='arrow' src='https://cdn.discordapp.com/attachments/801884180879376405/806242899720404992/arrow-40163_960_720.webp' alt='Arrow'/> 
            <div className='mini-container'>
                <img src='https://colab-image-assets.s3-us-west-1.amazonaws.com/book.png' alt='Book'/>
                <h1>Book the Lowest Prices</h1>
                <div>Book your flight! We guarantee to get you the cheapest possible flight.</div>
            </div>
        </div>
    )
} 

export default Work