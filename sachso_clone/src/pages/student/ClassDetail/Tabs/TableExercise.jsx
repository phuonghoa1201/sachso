import { BookOutlined, CalendarOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Table, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
function TableExercise() {
    const navigate = useNavigate();
    const dataSource = [
        {
            stt: '1',
            exercise: 'Mike hehehheheheheh',
            numberSubmit: 32,
            score: 10,
            uptodate: '30/5/2025',
            createDay: '20/3/2025',
            submitStatus: 'Chưa nộp bài',
            submitDay: '20/3/2025',
            scoreInfor: ''

        },
        {
            stt: '2',
            exercise: 'Mike hehehheheheheh',
            numberSubmit: 32,
            score: 10,
            uptodate: '30/5/2025',
            createDay: '20/3/2025',
            submitStatus: 'Đã nộp',
            submitDay: '20/3/2025',
            scoreInfor: ''
        },
    ];

    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Bài tập',
            dataIndex: 'exercise',
            key: 'exercise',
        },
        {
            title: 'Nộp bài',
            dataIndex: 'numberSubmit',
            key: 'numberSubmit',
            render: numberSubmit => (
                <>
                    <UserOutlined /> &nbsp;{numberSubmit}
                </>
            )
        },
        {
            title: 'Yêu cầu',
            children: [
                {
                    title: 'Điểm',
                    dataIndex: 'score',
                    key: 'score',

                },
                {
                    title: 'Hạn nộp bài',
                    dataIndex: 'uptodate',
                    key: 'uptodate',
                    render: submitDay => (
                        <>
                            <ClockCircleOutlined /> &nbsp;{submitDay}
                        </>
                    )

                },

            ]
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createDay',
            key: 'createDay',
            render: createDay => (
                <>
                    <CalendarOutlined /> &nbsp; {createDay}
                </>
            )

        },
        {
            title: 'Thông tin nộp bài',
            children: [
                {
                    title: 'Trạng thái',
                    dataIndex: 'submitStatus',
                    key: 'submitStatus',
                    render: (submitStatus) => {
                        let color = '';
                        if (submitStatus === 'Chưa nộp bài') color = 'yellow';
                        else if (submitStatus === 'Đã nộp') color = 'green';
                        else color = 'red';

                        return (
                            <span style={{ color }}>{submitStatus}</span>
                        );
                    }
                },

                {
                    title: 'Ngày nộp bài',
                    dataIndex: 'submitDay',
                    key: 'submitDay',

                },
                {
                    title: 'Điểm',
                    dataIndex: 'scoreInfor',
                    key: 'scoreInfor',

                },

            ],

        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button shape="circle" icon={<BookOutlined />} type="dashed" 
                    onClick={() => navigate(`${record.id}`)}
                    />
                </Space>
            ),
        }



    ];

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} bordered scroll={{ x: 'max-content' }} />;

        </div>
    );

}
export default TableExercise;