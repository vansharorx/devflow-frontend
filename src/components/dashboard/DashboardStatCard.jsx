export default function DashboardStatCard({

    title,
    value,
    color

}) {

    return (

        <div
            className="
                bg-white
                rounded-xl
                shadow-md
                p-6
                border-l-4
            "
            style={{
                borderColor: color
            }}
        >

            <p
                className="
                    text-gray-500
                    text-sm
                "
            >
                {title}
            </p>

            <h2
                className="
                    text-3xl
                    font-bold
                    mt-2
                    text-[#102C26]
                "
            >
                {value}
            </h2>

        </div>

    );

}