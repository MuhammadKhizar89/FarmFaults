function Description({ optional = true, description = "", setDescription = () => {}, isEditable = true }) {
    return (
        <div className="flex flex-col space-y-2">
            <h6 className="txt promoTest text-tertiary text-lg">
                Description {optional ? "( Optional )" : ""}
            </h6>
            <textarea
                value={description}
                onChange={(e) => isEditable && setDescription(e.target.value)}
                className="bg-[#F5EAD9] rounded-xl shadow-md p-4 placeholder:text-xs placeholder:font-thin"
                placeholder={!optional ?"No Description" :"Write Description here"}
                name=""
                id=""
                cols="40"
                rows="5"
                disabled={!isEditable}
            ></textarea>
        </div>
    );
}

export default Description;
