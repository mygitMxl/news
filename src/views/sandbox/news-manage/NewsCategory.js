import { Button, Table,Modal,Form ,Input} from 'antd'
import axios from 'axios'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal
const EditableContext = React.createContext(null);/* 创建一个全局context */
export default function NewsCategory() {
    const [dataSourse, setdataSourse] = useState()
    useEffect(() => {
     axios.get('/categories').then(res=>{
        console.log(res.data);
        setdataSourse(res.data)

     }
     )
    }, [])
    
    const  handleSave=(record)=>{
        console.log(record);
        setdataSourse(dataSourse.map(item=>{
            if(item.id===record.id){
                return{
                    id:item.id,
                    title:record.title,
                    value:record.title
                }
            }
            return item
        }))
        axios.patch(`/categories/${record.id}`,{
            title:record.title,
            value:record.title
        })
    }
    const columns=[
       {
        title:'ID',
        dataIndex:'id',
        render(id){
            return <b>{id}</b>
        }
       },
       {
        title:'栏目名称',
        dataIndex:'title',
        onCell:(record)=>({
            record,
            editable:true,/* 为true可编辑 */
            dataIndex:'title',
            title:'栏目名称',
            handleSave:handleSave
        })

       },
       {
        title:'操作',
        render:(item)=>{
            return <div>
                <Button danger shape='circle' icon={<DeleteOutlined />} onClick={()=>{handleClear(item)}}/>
            </div>
        }
       }
    ]
    /* 删除 */
    const handleClear=(item)=>{
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
            },
        });
    }
    const deleteMethod=(item)=>{
        let list=dataSourse.filter(data=>data.id!==item.id)
        setdataSourse(list)
        axios.delete(`/categories/${item.id}`)
    }
    /* .................................... */
    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };
    /* .............................................. */
    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                    <div
                        className="editable-cell-value-wrap"
                        style={{
                            paddingRight: 24,
                        }}
                        onClick={toggleEdit}
                    >
                        {children}
                    </div>
                );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    return (
        <div>
            <Table dataSource={dataSourse} columns={columns} pagination={{pageSize:5}}
             components={{
                body: {
                    row: EditableRow,
                    cell: EditableCell,
                }
            }}
            />
        </div>
    )
}
