import { Button, Form, Input, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { tabOrderDetailService } from 'services/orderDetailService';
import styled from 'styled-components';
import Select from 'react-select';
import { BiPlus } from 'react-icons/bi';

const FormAppeal = ({ cancel, type }) => {
  const [optionsAppeal, setOptionsAppeal] = useState([]);

  const { getListAppealReason } = tabOrderDetailService;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);

  const { uploadFile } = tabOrderDetailService;

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const findAllAppealReason = () => {
    getListAppealReason().then(res => {
      if (res.data.rc === 0) {
        if (type === 'Buy') {
          setOptionsAppeal(
            res.data.rows
              .filter(x => x.reasonType === 'FOR_BUY')
              .map((appeal: any) => ({
                value: appeal,
                label: appeal?.appealReason,
                key: appeal?.id,
              })),
          );
        } else {
          setOptionsAppeal(
            res.data.rows
              .filter(x => x.reasonType === 'FOR_SELL')
              .map((appeal: any) => ({
                value: appeal,
                label: appeal?.appealReason,
                key: appeal?.id,
              })),
          );
        }

        console.log(res.data.rows);
      }
    });
  };

  //upload file
  const handleChangeSelect = value => {
    console.log(value);
  };

  const uploadButton = (
    <div>
      <BiPlus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const uploadFileCustom = options => {
    console.log(options);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    console.log(fileList);
  };

  useEffect(() => {
    findAllAppealReason();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.resetFields();
  });

  return (
    <Wrapper>
      <Form form={form}>
        <Form.Item
          name="reasonId"
          label="Reason for Appeal (Mandatory)"
          labelAlign="left"
          rules={[{ required: true, message: 'Please input your reason!' }]}
          requiredMark="optional"
        >
          <Select
            className="selectAppeal"
            classNamePrefix="select"
            name="color"
            onChange={handleChangeSelect}
            options={optionsAppeal}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          labelAlign="left"
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
          requiredMark="optional"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="images"
          label="Upload proof (Mandatory)"
          labelAlign="left"
          rules={[{ required: true, message: 'Please upload your images!' }]}
          requiredMark="optional"
        >
          <span className="totalSpan">
            Screenshots or video/audio recordings of payment and communication
            data should not exceed a total of 5 files with total size of 100 MB.
          </span>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            customRequest={uploadFileCustom}
            onChange={handleChange}
            maxCount={5}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone (Mandatory)"
          labelAlign="left"
          rules={[{ required: true, message: 'Please input your phone!' }]}
          requiredMark="optional"
        >
          <Input />
        </Form.Item>
        <div className="btnGroup">
          <Button onClick={cancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Appeal
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default FormAppeal;

const Wrapper = styled.div`
  .ant-form {
    &-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
    .totalSpan {
      color: ${({ theme }) => theme.grayColor};
      font-size: 13px;
    }

    .btnGroup {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .ant-btn {
        width: 49%;
        height: 40px;
      }
    }

    .selectAppeal {
      .select__control {
        border-color: ${({ theme }) => theme.brightGrayColor};
        border-radius: 2px;
        box-shadow: none;
        &:focus {
          border-color: ${({ theme }) => theme.primary};
        }

        &:hover,
        &:focus {
          border-color: ${({ theme }) => theme.primary} !important;
        }
        cursor: pointer;
      }
    }

    .ant-input {
      border-color: ${({ theme }) => theme.brightGrayColor} !important;
      box-shadow: none !important;

      &:hover,
      &:focus {
        border-color: ${({ theme }) => theme.primary} !important;
      }
    }
  }
`;
