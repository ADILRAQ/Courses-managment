import _prisma from "@/lib/prismaClient"


export const createCourse = async (ownerId: number, title: string, description :string) => {

  try {

    const data = await _prisma.course.create({
      data: {
        title,
        description,
        instructorId: ownerId,
        picture: ''
      }
    });
    return data;
  } catch (error) {
    return null;
  }
}

export const getUserCourses = async (id: number) => {

  try {

    const data = await _prisma.user.findUnique({
      where: {
        id
      }, 
      select: {
        courses: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      }
    });
    return data;
  } catch (error) {
    return [];
  }
}

export const getCourses = async () => {

  try {

    const data = await _prisma.course.findMany({
      select: {
        id: true,
        title: true,
        description: true
      }
    });
    return data;
  } catch (error) {
    return [];
  }
}


export const updateCourse = async (courseId: number, userId: number, title: string, description: string) => {

  try {

    const data = await _prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        courses: {
          where: {
            id: courseId,
          }
        }
      }
    });

    if (!data?.courses.length) {
      return null;
    }

    let payload = {
      ...(title && { title }),
      ...(description && { description })
    };
    

    const update = await _prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...payload
      }
    });

    return update;

  } catch(e) {
    return null;
  }
}

export const deleteCourse = async (courseId: number, userId: number) => {

  try {

    const data = await _prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        courses: {
          where: {
            id: courseId,
          }
        }
      }
    });

    if (!data?.courses.length) {
      return null;
    }

    const deleted = await _prisma.course.delete({
      where: {
        id: courseId,
      }
    })

    return deleted;

  } catch(e) {
    return null;
  }
}