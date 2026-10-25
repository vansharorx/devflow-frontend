export default function ProjectProgressChart({ data = [] }) {
    return (
        <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-6 h-[440px] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
                <h2 className="heading-font text-xl font-extrabold text-black uppercase tracking-tight flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#00E676] border border-black inline-block"></span>
                    Project Progress
                </h2>
                <span className="font-mono text-xs text-gray-500 font-bold">
                    // RESOLUTION RATE
                </span>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                {data && data.length > 0 ? (
                    data.map((project) => (
                        <div
                            key={project.id}
                            className="p-3 bg-[#FFFDF8] border-2 border-black shadow-[2px_2px_0px_#000]"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-mono font-bold text-xs sm:text-sm text-black truncate max-w-[70%]">
                                    {project.name}
                                </span>

                                <span className="bg-[#FFE600] border border-black px-1.5 py-0.5 text-[11px] font-mono font-bold text-black shadow-[1px_1px_0px_#000]">
                                    {project.progress}%
                                </span>
                            </div>

                            {/* Neo-brutalist progress track */}
                            <div className="w-full h-4 bg-white border-2 border-black overflow-hidden relative">
                                <div
                                    className="h-full bg-black border-r-2 border-black transition-all duration-300"
                                    style={{
                                        width: `${project.progress}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex items-center justify-center font-mono text-xs text-gray-500">
                        // No project progress tracked
                    </div>
                )}
            </div>
        </div>
    );
}
