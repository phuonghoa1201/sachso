import { Select, Form, Button, Input } from "antd";
import TableClass from "./TableClass/TableClass";
function Class() {
    return (

        <div className="  mx-auto mt-4 bg-white">
            {/* Title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-b border-gray-300 px-4">
                <div className="uppercase text-xl font-medium">
                    tham gia lớp học
                </div>
            </div>
            <div className="py-4 px-4">
                <Form layout="inline"  className="flex md:flex-row md:flex-wrap md:items-end gap-3 md:gap-4">

                    <Form.Item label="Mã lớp học" name="id_class">
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item className="flex-none">
                        <Button type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>

            </div>
             <TableClass/>
        </div>

    );

}
export default Class;