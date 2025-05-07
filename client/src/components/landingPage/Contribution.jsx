function Contribution() {
    return (
        <section className="flex flex-col lg:flex-row justify-center bg-secondary px-4 py-8 lg:px-28 lg:py-20" id="contribution">
            <div className="lg:w-[60%] py-4 lg:py-20 flex flex-col justify-center space-y-2">
                <h4 className="text-4xl">Why Your Contribution Matters?</h4>
                <p className="lg:w-[75%]">
                    By participating, you’re not just earning points you’re making a real impact. Each report helps
                    fellow farmers avoid common mistakes, leading to better yields and healthier crops. Plus, the game’s
                    fun and competitive edge makes learning engaging.
                </p>
            </div>
            <div className="h-[80vh] lg:w-[40%]  bg-primary">
                <img className="w-full h-full object-cover" src="/images/landingPage/contribution.jpg" alt="contribution" />
            </div>
        </section>
    );
}
export default Contribution;
