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

export const getCourses = async (id: number) => {

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
