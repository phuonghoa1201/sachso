import { useEffect, useState } from "react";
import CreateClass from "./CreateClass/CreateClass";
import TableManageClass from "./TableManageClass/TableManageClass";
import { getClassApi } from "../../../util/teacher/teacherApi";

function ManageClass() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClass = async () => {
            const res = await getClassApi();
            console.log("API response:", res);
            if (Array.isArray(res)) {
                setClasses(res);
            } else {
                setClasses([]);
            }
        };
        fetchClass();
    }, []);
    // Hàm cập nhật state khi thêm lớp mới
    const addClassToState = (newClass) => {
        setClasses((prev) => [...prev, newClass])
    }
    return (
        <div>
            <div className="w-full bg-blue-300 p-4">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* Bảng lớp học */}
                    <div className="w-full md:w-2/3 bg-white rounded shadow p-4">
                        {/* Title */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-b border-gray-300 px-4">
                            <div className="uppercase text-xl font-medium">
                                DANH SÁCH LỚP HỌC
                            </div>
                        </div>
                        <TableManageClass classes={classes} />
                    </div>

                    {/* Form tạo lớp học */}
                    <div className="w-full md:w-1/3 bg-white rounded shadow p-4">
                        <CreateClass addClassToState={addClassToState} />
                    </div>
                </div>
            </div>
        </div>


    );
}

export default ManageClass;
