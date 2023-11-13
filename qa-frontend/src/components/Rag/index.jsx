import { StorageManager } from '@aws-amplify/ui-react-storage';
import { Card, Button } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Rag = ({webhookState}) => {
    const [upload, setUpload] = useState(true)

    return(
        <div>
            {webhookState ?
             (      <>
                        <Card variation="elevated">Drop Files to Generate Rag or press botton to scape</Card>
                        <StorageManager
                                    acceptedFileTypes={[
                                    // you can list file extensions:
                                    '.pdf'
                                    // or MIME types:
                                    ]}
                                    path="documents/"
                                    accessLevel="private"
                                    maxFileCount={5}
                                    // Size is in bytes
                                    maxFileSize={10000000}
                                    onUploadStart={() => setUpload(false)}
                                    onUploadSuccess={() => setUpload(true)}
                                />
                        {upload ? <Button><Link to={"/prompt"}>Press Here To Continue</Link></Button> : <>Waiting For Upload</>}
                    </>)
                : <>Stablising Connection</>
            }
        </div>

    );
};

export default Rag;