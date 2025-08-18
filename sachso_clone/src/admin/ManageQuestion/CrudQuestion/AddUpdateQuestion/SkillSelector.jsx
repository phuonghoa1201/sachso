import { useEffect, useState } from "react"
import { getSkillApi } from "../../../../util/question/dropdown"
import { Form, Select } from "antd"

function SkillSelector({ form, editingQuestion }) {
    const [skillOptions, setSkillOptions] = useState([])
    // tạo state lưu mange giá trị được chọn
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedSkillId, setSelectedSkillId] = useState(null);

    // Khi edit, set selectedGradeId và form field
    useEffect(() => {
        if (editingQuestion) {
            const skillId = editingQuestion.skillId?._id || editingQuestion.skillId
            if (skillId) setSelectedSkillId(skillId);
            form.setFieldsValue({ skillId });
        }
    }, [editingQuestion, form])
    useEffect(() => {
        const loadSkill = async () => {
            const skills = await getSkillApi();
            console.log("Api skill", skills);

            const mappedSkill = skills.map(s => ({
                value: s._id,
                label: s.name
            }))
            setSkillOptions(mappedSkill)
        }
        loadSkill()
    }, [])
    return (
        <div>
            <Form.Item
                label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">kỹ năng</span>}
                name="skillId"

            >
                <Select
                    placeholder="Chọn kỹ năng"
                 
                    options={skillOptions}
                    value={selectedSkills}
                    onChange={(value) => setSelectedSkills(value)

                    }
                />
                   {/* mode="multiple" */}
            </Form.Item>
            {/* <Form.Item
                            label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">kỹ năng</span>}
                            name="skills"
                        >
                            <Select
                                placeholder="Chọn kỹ năng"
                                mode="multiple"
                                options={[
                                    { value: "L", label: "L" },
                                    { value: "S", label: "S" },
                                    { value: "W", label: "W" },
                                    { value: "R", label: "R" },
                                ]}
                            />
                        </Form.Item> */}

        </div>
    )
}
export default SkillSelector