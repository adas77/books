import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import { toBase64ImageUrl } from '~/utils/image';
type Props = {
    setB64: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ImgUploader = ({ setB64 }: Props) => {
    return (
        <ImageUploader
            style={{ height: 100, width: 100, background: 'transparent' }}
            deleteIcon={<></>}
            uploadIcon={
                <svg className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
            }
            onFileAdded={async (file) => {
                const b64 = await toBase64ImageUrl(file.dataUrl);
                setB64(b64)
            }}
        />
    )
}

export default ImgUploader