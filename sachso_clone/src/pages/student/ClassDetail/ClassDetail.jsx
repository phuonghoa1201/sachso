import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import TableExercise from "./Tabs/TableExercise";

const mockData = [
    {
        stt: "1",
        id_class: "57Fbd",
        nameofClass: "10 Downing Street",
        totalStudent: "10",
        note: "Lớp chuyên Anh",
        statusClass: "Đã xác nhận"
    },
    {
        stt: "2",
        id_class: "6738",
        nameofClass: "10 Street",
        totalStudent: "10",
        note: "Lớp tích hợp",
        statusClass: "Chưa xác nhận"
    },
    {
        stt: "3",
        id_class: "6Gh8",
        nameofClass: "Halo Street",
        totalStudent: "10",
        note: "Lớp thử nghiệm",
        statusClass: "Đã xác nhận"
    }
];

function ClassDetail() {
    const { id_class } = useParams();

    const classInfo = mockData.find(item => item.id_class === id_class);

    if (!classInfo) {
        return (
            <div className="p-6 text-red-500 font-semibold">
                Không tìm thấy lớp có mã: {id_class}
            </div>
        );
    }

    const items = [
        {
            key: '1',
            label: 'Bài tập',
            children: <TableExercise/>,
        },
        {
            key: '2',
            label: 'Kết quả làm bài',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Đánh giá thường xuyên',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Đánh giá định kỳ',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '5',
            label: 'Học sinh',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '6',
            label: 'Thông báo',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '7',
            label: 'Rèn luyện bồi dưỡng',
            children: 'Content of Tab Pane 3',
        },
    ];


    // const columns = [
    //     {
    //         title: "",
    //         dataIndex: "label",
    //         key: "label",
    //         width: 150
    //     },
    //     {
    //         title: "Thông tin lớp",
    //         dataIndex: "value",
    //         key: "value"
    //     }
    // ];

    // const dataSource = [
    //     {
    //         key: "1",
    //         label: "Mã lớp",
    //         value: classInfo.id_class
    //     },
    //     {
    //         key: "2",
    //         label: "Tên lớp",
    //         value: classInfo.nameofClass
    //     },
    //     {
    //         key: "3",
    //         label: "Sỉ số",
    //         value: classInfo.totalStudent
    //     },
    //     {
    //         key: "4",
    //         label: "Trạng thái",
    //         value: (
    //             <span style={{ color: classInfo.statusClass === "Đã xác nhận" ? "green" : "red" }}>
    //                 {classInfo.statusClass}
    //             </span>
    //         )
    //     },
    //     {
    //         key: "5",
    //         label: "Ghi chú",
    //         value: classInfo.note || "Không có"
    //     }
    // ];
    return (
        <div className=" mx-auto mt-4 bg-white">
            {/* Title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-b border-gray-300 px-4">
                <div className="uppercase text-xl font-medium">
                    chi tiết lớp học
                </div>
                <div className="flex space-x-2 text-sm">
                    <button className=" py-2 text-white rounded  bg-blue-500 px-4">
                        Báo cáo
                    </button>

                </div>

            </div>
            <div className="grid sm:grid-cols-2 px-4 md:grid-cols-6 gap-0 border border-gray-300 px-4 py-4">
                <div className=" border border-gray-300 px-4 py-4 bg-gray-200">Mã lớp học</div>
                <div className=" border border-gray-300 px-4 py-4">{classInfo.id_class}</div>
                <div className=" border border-gray-300 px-4 py-4 bg-gray-200">Tên lớp học</div>
                <div className=" border border-gray-300 px-4 py-4">{classInfo.nameofClass}</div>
                <div className=" border border-gray-300 px-4 py-4 bg-gray-200">Sỉ số</div>
                <div className=" border border-gray-300 px-4 py-4">{classInfo.totalStudent}</div>
                <div className=" border border-gray-300 px-4 py-4 bg-gray-200">Giáo viên</div>
                <div className=" border border-gray-300 px-4 py-4">Text</div>
                <div className=" border border-gray-300 px-4 py-4 bg-gray-200">Điện thoại</div>
                <div className=" border border-gray-300 px-4 py-4">Phone</div>
                <div className=" border border-gray-300 px-4 py-4 bg-gray-200">Email</div>
                <div className=" border border-gray-300 px-4 py-4">Email</div>

            </div>
            <div className="my-8 mx-4">
                <Tabs defaultActiveKey="1" items={items} />

            </div>

            {/* <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                showHeader={false}

                bordered
            /> */}
        </div>
    );
}

export default ClassDetail;