import clsx from "clsx";

const HomeSectionTitle = ({title, description} : {title: string, description?: string}) => {
    return (
        <>
            <h3 className={clsx(
                "text-3xl font-medium",
                !description ? "mb-8" : "mb-2 leading-[1.25]"
            )}>{title}</h3>
            {description && <h4 className='text-base mb-8 text-textUnfocus'>{description}</h4>}
        </>
    )
}

export default HomeSectionTitle;