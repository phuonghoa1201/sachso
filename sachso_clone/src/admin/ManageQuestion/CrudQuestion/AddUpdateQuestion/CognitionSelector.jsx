import { useEffect, useState } from "react"
import { getCognitionSelectorApi } from "../../../../util/question/dropdown"
import { Form, Select } from "antd"

function CognitionSelector() {
    const [cognitionOptions, setCognitionOptions] = useState([])

    useEffect(() => {
        const loadRequirement = async () => {
            const cognition = await getCognitionSelectorApi()
            const mappedCognition = cognition.map(c => ({
                value: c._id,
                label: c.name
            }))
            setCognitionOptions(mappedCognition)
        }
        loadRequirement()
    }, [])

    return (
        <Form.Item
            label={<span className="rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">Mức độ nhận thức</span>}
            name="cognitionLevelId"
            rules={[{ message: "Vui lòng chọn mức độ nhận thức!" }]}
        >
            <Select
                placeholder="Chọn mức độ"
                options={cognitionOptions}
            />
        </Form.Item>
    )
}

export default CognitionSelector
