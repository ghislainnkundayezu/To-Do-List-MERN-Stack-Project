import axios from "axios";

const requestOptions = {
    withCredentials:true,
}

export async function fetchUserData() {

    const response = await axios.get(
        `http://localhost:5000/api/v1/protected/user`,
        requestOptions
    );
    return response.data;
};

export async function createTask(taskContent: {content: string, status: string}) {
    const requestBody = {
        "content" : taskContent.content,
        "status" : taskContent.status
    }
    const response = await axios.post(
        `http://localhost:5000/api/v1/protected/user/create-task`,
        requestBody,
        requestOptions

      );
      return response.data;
}


export async function removeTask(taskId: string) {
    
    const response = await axios.delete(
        `http://localhost:5000/api/v1/protected/user/delete-task?taskId=${taskId}`,
        requestOptions
      );
      return response.data;
}

export async function changeTaskStatus(taskContent: {taskId: string, newStatus: string}) {
    const requestBody = {
        "taskId" : taskContent.taskId,
        "newStatus" : taskContent.newStatus
    };
    console.log(requestBody)
    const response = await axios.patch(
        `http://localhost:5000/api/v1/protected/user/update-task-status`,
        requestBody,
        requestOptions
      );

      return response.data;

}

export async function changeTaskContent(taskContent:{taskId: string, newContent: string}) {
    const requestBody = {
        "taskId" : taskContent.taskId,
        "neewContent" : taskContent.newContent
    };

    const response = await axios.patch(
        `http://localhost:5000/api/v1/protected/user/update-task-content`,
        requestBody,
        requestOptions
      );
      
      return response.data;

}

export async function logout() {
    const response = await axios.post(
        `http://localhost:5000/api/v1/protected/logout`,
        requestOptions
      );
      
      return response.data;

}