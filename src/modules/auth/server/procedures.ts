import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { headers as getHeaders } from "next/headers";
import { TRPCError } from "@trpc/server";
import { LoginSchema, RegisterSchema } from "../schemas";
import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });
    return session;
  }),
  register: baseProcedure
    .input(RegisterSchema)
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: { equals: input.username },
        },
      });
      const existingUser = existingData.docs[0];
      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }
      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, //Automatically hashed.
        },
      });
      //   After user is registered attempt to login
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      await generateAuthCookie({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });
      return data;
    }),
  login: baseProcedure.input(LoginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }
    await generateAuthCookie({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    });
    return data;
  }),
});
