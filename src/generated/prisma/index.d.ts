
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Media
 * 
 */
export type Media = $Result.DefaultSelection<Prisma.$MediaPayload>
/**
 * Model Drive
 * 
 */
export type Drive = $Result.DefaultSelection<Prisma.$DrivePayload>
/**
 * Model DriveAccess
 * 
 */
export type DriveAccess = $Result.DefaultSelection<Prisma.$DriveAccessPayload>
/**
 * Model Settings
 * 
 */
export type Settings = $Result.DefaultSelection<Prisma.$SettingsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.media`: Exposes CRUD operations for the **Media** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Media
    * const media = await prisma.media.findMany()
    * ```
    */
  get media(): Prisma.MediaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.drive`: Exposes CRUD operations for the **Drive** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drives
    * const drives = await prisma.drive.findMany()
    * ```
    */
  get drive(): Prisma.DriveDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.driveAccess`: Exposes CRUD operations for the **DriveAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DriveAccesses
    * const driveAccesses = await prisma.driveAccess.findMany()
    * ```
    */
  get driveAccess(): Prisma.DriveAccessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.settings`: Exposes CRUD operations for the **Settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.settings.findMany()
    * ```
    */
  get settings(): Prisma.SettingsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Media: 'Media',
    Drive: 'Drive',
    DriveAccess: 'DriveAccess',
    Settings: 'Settings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "media" | "drive" | "driveAccess" | "settings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Media: {
        payload: Prisma.$MediaPayload<ExtArgs>
        fields: Prisma.MediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findFirst: {
            args: Prisma.MediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findMany: {
            args: Prisma.MediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          create: {
            args: Prisma.MediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          createMany: {
            args: Prisma.MediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          delete: {
            args: Prisma.MediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          update: {
            args: Prisma.MediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          deleteMany: {
            args: Prisma.MediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          upsert: {
            args: Prisma.MediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          aggregate: {
            args: Prisma.MediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedia>
          }
          groupBy: {
            args: Prisma.MediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaCountArgs<ExtArgs>
            result: $Utils.Optional<MediaCountAggregateOutputType> | number
          }
        }
      }
      Drive: {
        payload: Prisma.$DrivePayload<ExtArgs>
        fields: Prisma.DriveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload>
          }
          findFirst: {
            args: Prisma.DriveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload>
          }
          findMany: {
            args: Prisma.DriveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload>[]
          }
          create: {
            args: Prisma.DriveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload>
          }
          createMany: {
            args: Prisma.DriveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload>[]
          }
          delete: {
            args: Prisma.DriveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload>
          }
          update: {
            args: Prisma.DriveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload>
          }
          deleteMany: {
            args: Prisma.DriveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriveUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload>[]
          }
          upsert: {
            args: Prisma.DriveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrivePayload>
          }
          aggregate: {
            args: Prisma.DriveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDrive>
          }
          groupBy: {
            args: Prisma.DriveGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriveGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriveCountArgs<ExtArgs>
            result: $Utils.Optional<DriveCountAggregateOutputType> | number
          }
        }
      }
      DriveAccess: {
        payload: Prisma.$DriveAccessPayload<ExtArgs>
        fields: Prisma.DriveAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriveAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriveAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload>
          }
          findFirst: {
            args: Prisma.DriveAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriveAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload>
          }
          findMany: {
            args: Prisma.DriveAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload>[]
          }
          create: {
            args: Prisma.DriveAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload>
          }
          createMany: {
            args: Prisma.DriveAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriveAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload>[]
          }
          delete: {
            args: Prisma.DriveAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload>
          }
          update: {
            args: Prisma.DriveAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload>
          }
          deleteMany: {
            args: Prisma.DriveAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriveAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriveAccessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload>[]
          }
          upsert: {
            args: Prisma.DriveAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriveAccessPayload>
          }
          aggregate: {
            args: Prisma.DriveAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriveAccess>
          }
          groupBy: {
            args: Prisma.DriveAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriveAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriveAccessCountArgs<ExtArgs>
            result: $Utils.Optional<DriveAccessCountAggregateOutputType> | number
          }
        }
      }
      Settings: {
        payload: Prisma.$SettingsPayload<ExtArgs>
        fields: Prisma.SettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findFirst: {
            args: Prisma.SettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findMany: {
            args: Prisma.SettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          create: {
            args: Prisma.SettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          createMany: {
            args: Prisma.SettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          delete: {
            args: Prisma.SettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          update: {
            args: Prisma.SettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          deleteMany: {
            args: Prisma.SettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          upsert: {
            args: Prisma.SettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          aggregate: {
            args: Prisma.SettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettings>
          }
          groupBy: {
            args: Prisma.SettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    media?: MediaOmit
    drive?: DriveOmit
    driveAccess?: DriveAccessOmit
    settings?: SettingsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    media: number
    ownedDrives: number
    driveAccess: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | UserCountOutputTypeCountMediaArgs
    ownedDrives?: boolean | UserCountOutputTypeCountOwnedDrivesArgs
    driveAccess?: boolean | UserCountOutputTypeCountDriveAccessArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedDrivesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriveWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDriveAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriveAccessWhereInput
  }


  /**
   * Count Type DriveCountOutputType
   */

  export type DriveCountOutputType = {
    files: number
    access: number
  }

  export type DriveCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | DriveCountOutputTypeCountFilesArgs
    access?: boolean | DriveCountOutputTypeCountAccessArgs
  }

  // Custom InputTypes
  /**
   * DriveCountOutputType without action
   */
  export type DriveCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveCountOutputType
     */
    select?: DriveCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DriveCountOutputType without action
   */
  export type DriveCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
  }

  /**
   * DriveCountOutputType without action
   */
  export type DriveCountOutputTypeCountAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriveAccessWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    customMaxFileSize: number | null
    customRateLimitWindow: number | null
  }

  export type UserSumAggregateOutputType = {
    customMaxFileSize: bigint | null
    customRateLimitWindow: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    isAdmin: boolean | null
    mustChangePassword: boolean | null
    createdAt: Date | null
    customMaxFileSize: bigint | null
    customRateLimitWindow: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    isAdmin: boolean | null
    mustChangePassword: boolean | null
    createdAt: Date | null
    customMaxFileSize: bigint | null
    customRateLimitWindow: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    isAdmin: number
    mustChangePassword: number
    createdAt: number
    customMaxFileSize: number
    customRateLimitWindow: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    customMaxFileSize?: true
    customRateLimitWindow?: true
  }

  export type UserSumAggregateInputType = {
    customMaxFileSize?: true
    customRateLimitWindow?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    isAdmin?: true
    mustChangePassword?: true
    createdAt?: true
    customMaxFileSize?: true
    customRateLimitWindow?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    isAdmin?: true
    mustChangePassword?: true
    createdAt?: true
    customMaxFileSize?: true
    customRateLimitWindow?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    isAdmin?: true
    mustChangePassword?: true
    createdAt?: true
    customMaxFileSize?: true
    customRateLimitWindow?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    isAdmin: boolean
    mustChangePassword: boolean
    createdAt: Date
    customMaxFileSize: bigint | null
    customRateLimitWindow: number | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: boolean
    customMaxFileSize?: boolean
    customRateLimitWindow?: boolean
    media?: boolean | User$mediaArgs<ExtArgs>
    ownedDrives?: boolean | User$ownedDrivesArgs<ExtArgs>
    driveAccess?: boolean | User$driveAccessArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: boolean
    customMaxFileSize?: boolean
    customRateLimitWindow?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: boolean
    customMaxFileSize?: boolean
    customRateLimitWindow?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: boolean
    customMaxFileSize?: boolean
    customRateLimitWindow?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "isAdmin" | "mustChangePassword" | "createdAt" | "customMaxFileSize" | "customRateLimitWindow", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | User$mediaArgs<ExtArgs>
    ownedDrives?: boolean | User$ownedDrivesArgs<ExtArgs>
    driveAccess?: boolean | User$driveAccessArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      media: Prisma.$MediaPayload<ExtArgs>[]
      ownedDrives: Prisma.$DrivePayload<ExtArgs>[]
      driveAccess: Prisma.$DriveAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      isAdmin: boolean
      mustChangePassword: boolean
      createdAt: Date
      customMaxFileSize: bigint | null
      customRateLimitWindow: number | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    media<T extends User$mediaArgs<ExtArgs> = {}>(args?: Subset<T, User$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedDrives<T extends User$ownedDrivesArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedDrivesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    driveAccess<T extends User$driveAccessArgs<ExtArgs> = {}>(args?: Subset<T, User$driveAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly mustChangePassword: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly customMaxFileSize: FieldRef<"User", 'BigInt'>
    readonly customRateLimitWindow: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.media
   */
  export type User$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    cursor?: MediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * User.ownedDrives
   */
  export type User$ownedDrivesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    where?: DriveWhereInput
    orderBy?: DriveOrderByWithRelationInput | DriveOrderByWithRelationInput[]
    cursor?: DriveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DriveScalarFieldEnum | DriveScalarFieldEnum[]
  }

  /**
   * User.driveAccess
   */
  export type User$driveAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    where?: DriveAccessWhereInput
    orderBy?: DriveAccessOrderByWithRelationInput | DriveAccessOrderByWithRelationInput[]
    cursor?: DriveAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DriveAccessScalarFieldEnum | DriveAccessScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Media
   */

  export type AggregateMedia = {
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  export type MediaAvgAggregateOutputType = {
    size: number | null
  }

  export type MediaSumAggregateOutputType = {
    size: number | null
  }

  export type MediaMinAggregateOutputType = {
    id: string | null
    filename: string | null
    originalName: string | null
    mimeType: string | null
    size: number | null
    ip: string | null
    userId: string | null
    isPrivate: boolean | null
    transcodeStatus: string | null
    transcodeError: string | null
    createdAt: Date | null
    driveId: string | null
  }

  export type MediaMaxAggregateOutputType = {
    id: string | null
    filename: string | null
    originalName: string | null
    mimeType: string | null
    size: number | null
    ip: string | null
    userId: string | null
    isPrivate: boolean | null
    transcodeStatus: string | null
    transcodeError: string | null
    createdAt: Date | null
    driveId: string | null
  }

  export type MediaCountAggregateOutputType = {
    id: number
    filename: number
    originalName: number
    mimeType: number
    size: number
    ip: number
    userId: number
    isPrivate: number
    transcodeStatus: number
    transcodeError: number
    createdAt: number
    driveId: number
    _all: number
  }


  export type MediaAvgAggregateInputType = {
    size?: true
  }

  export type MediaSumAggregateInputType = {
    size?: true
  }

  export type MediaMinAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    mimeType?: true
    size?: true
    ip?: true
    userId?: true
    isPrivate?: true
    transcodeStatus?: true
    transcodeError?: true
    createdAt?: true
    driveId?: true
  }

  export type MediaMaxAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    mimeType?: true
    size?: true
    ip?: true
    userId?: true
    isPrivate?: true
    transcodeStatus?: true
    transcodeError?: true
    createdAt?: true
    driveId?: true
  }

  export type MediaCountAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    mimeType?: true
    size?: true
    ip?: true
    userId?: true
    isPrivate?: true
    transcodeStatus?: true
    transcodeError?: true
    createdAt?: true
    driveId?: true
    _all?: true
  }

  export type MediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to aggregate.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Media
    **/
    _count?: true | MediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaMaxAggregateInputType
  }

  export type GetMediaAggregateType<T extends MediaAggregateArgs> = {
        [P in keyof T & keyof AggregateMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedia[P]>
      : GetScalarType<T[P], AggregateMedia[P]>
  }




  export type MediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithAggregationInput | MediaOrderByWithAggregationInput[]
    by: MediaScalarFieldEnum[] | MediaScalarFieldEnum
    having?: MediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaCountAggregateInputType | true
    _avg?: MediaAvgAggregateInputType
    _sum?: MediaSumAggregateInputType
    _min?: MediaMinAggregateInputType
    _max?: MediaMaxAggregateInputType
  }

  export type MediaGroupByOutputType = {
    id: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip: string | null
    userId: string | null
    isPrivate: boolean
    transcodeStatus: string
    transcodeError: string | null
    createdAt: Date
    driveId: string | null
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  type GetMediaGroupByPayload<T extends MediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaGroupByOutputType[P]>
            : GetScalarType<T[P], MediaGroupByOutputType[P]>
        }
      >
    >


  export type MediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    ip?: boolean
    userId?: boolean
    isPrivate?: boolean
    transcodeStatus?: boolean
    transcodeError?: boolean
    createdAt?: boolean
    driveId?: boolean
    user?: boolean | Media$userArgs<ExtArgs>
    drive?: boolean | Media$driveArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type MediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    ip?: boolean
    userId?: boolean
    isPrivate?: boolean
    transcodeStatus?: boolean
    transcodeError?: boolean
    createdAt?: boolean
    driveId?: boolean
    user?: boolean | Media$userArgs<ExtArgs>
    drive?: boolean | Media$driveArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type MediaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    ip?: boolean
    userId?: boolean
    isPrivate?: boolean
    transcodeStatus?: boolean
    transcodeError?: boolean
    createdAt?: boolean
    driveId?: boolean
    user?: boolean | Media$userArgs<ExtArgs>
    drive?: boolean | Media$driveArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type MediaSelectScalar = {
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    ip?: boolean
    userId?: boolean
    isPrivate?: boolean
    transcodeStatus?: boolean
    transcodeError?: boolean
    createdAt?: boolean
    driveId?: boolean
  }

  export type MediaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "filename" | "originalName" | "mimeType" | "size" | "ip" | "userId" | "isPrivate" | "transcodeStatus" | "transcodeError" | "createdAt" | "driveId", ExtArgs["result"]["media"]>
  export type MediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Media$userArgs<ExtArgs>
    drive?: boolean | Media$driveArgs<ExtArgs>
  }
  export type MediaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Media$userArgs<ExtArgs>
    drive?: boolean | Media$driveArgs<ExtArgs>
  }
  export type MediaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Media$userArgs<ExtArgs>
    drive?: boolean | Media$driveArgs<ExtArgs>
  }

  export type $MediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Media"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      drive: Prisma.$DrivePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      filename: string
      originalName: string
      mimeType: string
      size: number
      ip: string | null
      userId: string | null
      isPrivate: boolean
      transcodeStatus: string
      transcodeError: string | null
      createdAt: Date
      driveId: string | null
    }, ExtArgs["result"]["media"]>
    composites: {}
  }

  type MediaGetPayload<S extends boolean | null | undefined | MediaDefaultArgs> = $Result.GetResult<Prisma.$MediaPayload, S>

  type MediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaCountAggregateInputType | true
    }

  export interface MediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Media'], meta: { name: 'Media' } }
    /**
     * Find zero or one Media that matches the filter.
     * @param {MediaFindUniqueArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaFindUniqueArgs>(args: SelectSubset<T, MediaFindUniqueArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Media that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaFindUniqueOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaFindFirstArgs>(args?: SelectSubset<T, MediaFindFirstArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Media
     * const media = await prisma.media.findMany()
     * 
     * // Get first 10 Media
     * const media = await prisma.media.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaWithIdOnly = await prisma.media.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaFindManyArgs>(args?: SelectSubset<T, MediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Media.
     * @param {MediaCreateArgs} args - Arguments to create a Media.
     * @example
     * // Create one Media
     * const Media = await prisma.media.create({
     *   data: {
     *     // ... data to create a Media
     *   }
     * })
     * 
     */
    create<T extends MediaCreateArgs>(args: SelectSubset<T, MediaCreateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Media.
     * @param {MediaCreateManyArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaCreateManyArgs>(args?: SelectSubset<T, MediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Media and returns the data saved in the database.
     * @param {MediaCreateManyAndReturnArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Media and only return the `id`
     * const mediaWithIdOnly = await prisma.media.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Media.
     * @param {MediaDeleteArgs} args - Arguments to delete one Media.
     * @example
     * // Delete one Media
     * const Media = await prisma.media.delete({
     *   where: {
     *     // ... filter to delete one Media
     *   }
     * })
     * 
     */
    delete<T extends MediaDeleteArgs>(args: SelectSubset<T, MediaDeleteArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Media.
     * @param {MediaUpdateArgs} args - Arguments to update one Media.
     * @example
     * // Update one Media
     * const media = await prisma.media.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaUpdateArgs>(args: SelectSubset<T, MediaUpdateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Media.
     * @param {MediaDeleteManyArgs} args - Arguments to filter Media to delete.
     * @example
     * // Delete a few Media
     * const { count } = await prisma.media.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaDeleteManyArgs>(args?: SelectSubset<T, MediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaUpdateManyArgs>(args: SelectSubset<T, MediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media and returns the data updated in the database.
     * @param {MediaUpdateManyAndReturnArgs} args - Arguments to update many Media.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Media and only return the `id`
     * const mediaWithIdOnly = await prisma.media.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Media.
     * @param {MediaUpsertArgs} args - Arguments to update or create a Media.
     * @example
     * // Update or create a Media
     * const media = await prisma.media.upsert({
     *   create: {
     *     // ... data to create a Media
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Media we want to update
     *   }
     * })
     */
    upsert<T extends MediaUpsertArgs>(args: SelectSubset<T, MediaUpsertArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaCountArgs} args - Arguments to filter Media to count.
     * @example
     * // Count the number of Media
     * const count = await prisma.media.count({
     *   where: {
     *     // ... the filter for the Media we want to count
     *   }
     * })
    **/
    count<T extends MediaCountArgs>(
      args?: Subset<T, MediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaAggregateArgs>(args: Subset<T, MediaAggregateArgs>): Prisma.PrismaPromise<GetMediaAggregateType<T>>

    /**
     * Group by Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaGroupByArgs['orderBy'] }
        : { orderBy?: MediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Media model
   */
  readonly fields: MediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Media.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Media$userArgs<ExtArgs> = {}>(args?: Subset<T, Media$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    drive<T extends Media$driveArgs<ExtArgs> = {}>(args?: Subset<T, Media$driveArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Media model
   */
  interface MediaFieldRefs {
    readonly id: FieldRef<"Media", 'String'>
    readonly filename: FieldRef<"Media", 'String'>
    readonly originalName: FieldRef<"Media", 'String'>
    readonly mimeType: FieldRef<"Media", 'String'>
    readonly size: FieldRef<"Media", 'Int'>
    readonly ip: FieldRef<"Media", 'String'>
    readonly userId: FieldRef<"Media", 'String'>
    readonly isPrivate: FieldRef<"Media", 'Boolean'>
    readonly transcodeStatus: FieldRef<"Media", 'String'>
    readonly transcodeError: FieldRef<"Media", 'String'>
    readonly createdAt: FieldRef<"Media", 'DateTime'>
    readonly driveId: FieldRef<"Media", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Media findUnique
   */
  export type MediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findUniqueOrThrow
   */
  export type MediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findFirst
   */
  export type MediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findFirstOrThrow
   */
  export type MediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findMany
   */
  export type MediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media create
   */
  export type MediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to create a Media.
     */
    data: XOR<MediaCreateInput, MediaUncheckedCreateInput>
  }

  /**
   * Media createMany
   */
  export type MediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
  }

  /**
   * Media createManyAndReturn
   */
  export type MediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Media update
   */
  export type MediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to update a Media.
     */
    data: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
    /**
     * Choose, which Media to update.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media updateMany
   */
  export type MediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Media.
     */
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyInput>
    /**
     * Filter which Media to update
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to update.
     */
    limit?: number
  }

  /**
   * Media updateManyAndReturn
   */
  export type MediaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * The data used to update Media.
     */
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyInput>
    /**
     * Filter which Media to update
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Media upsert
   */
  export type MediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The filter to search for the Media to update in case it exists.
     */
    where: MediaWhereUniqueInput
    /**
     * In case the Media found by the `where` argument doesn't exist, create a new Media with this data.
     */
    create: XOR<MediaCreateInput, MediaUncheckedCreateInput>
    /**
     * In case the Media was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
  }

  /**
   * Media delete
   */
  export type MediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter which Media to delete.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media deleteMany
   */
  export type MediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to delete
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to delete.
     */
    limit?: number
  }

  /**
   * Media.user
   */
  export type Media$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Media.drive
   */
  export type Media$driveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    where?: DriveWhereInput
  }

  /**
   * Media without action
   */
  export type MediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
  }


  /**
   * Model Drive
   */

  export type AggregateDrive = {
    _count: DriveCountAggregateOutputType | null
    _min: DriveMinAggregateOutputType | null
    _max: DriveMaxAggregateOutputType | null
  }

  export type DriveMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    ownerId: string | null
    isPublic: boolean | null
    publicRole: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriveMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    ownerId: string | null
    isPublic: boolean | null
    publicRole: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriveCountAggregateOutputType = {
    id: number
    name: number
    description: number
    ownerId: number
    isPublic: number
    publicRole: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DriveMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ownerId?: true
    isPublic?: true
    publicRole?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriveMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ownerId?: true
    isPublic?: true
    publicRole?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriveCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ownerId?: true
    isPublic?: true
    publicRole?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DriveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drive to aggregate.
     */
    where?: DriveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drives to fetch.
     */
    orderBy?: DriveOrderByWithRelationInput | DriveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drives
    **/
    _count?: true | DriveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriveMaxAggregateInputType
  }

  export type GetDriveAggregateType<T extends DriveAggregateArgs> = {
        [P in keyof T & keyof AggregateDrive]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDrive[P]>
      : GetScalarType<T[P], AggregateDrive[P]>
  }




  export type DriveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriveWhereInput
    orderBy?: DriveOrderByWithAggregationInput | DriveOrderByWithAggregationInput[]
    by: DriveScalarFieldEnum[] | DriveScalarFieldEnum
    having?: DriveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriveCountAggregateInputType | true
    _min?: DriveMinAggregateInputType
    _max?: DriveMaxAggregateInputType
  }

  export type DriveGroupByOutputType = {
    id: string
    name: string
    description: string | null
    ownerId: string
    isPublic: boolean
    publicRole: string
    createdAt: Date
    updatedAt: Date
    _count: DriveCountAggregateOutputType | null
    _min: DriveMinAggregateOutputType | null
    _max: DriveMaxAggregateOutputType | null
  }

  type GetDriveGroupByPayload<T extends DriveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriveGroupByOutputType[P]>
            : GetScalarType<T[P], DriveGroupByOutputType[P]>
        }
      >
    >


  export type DriveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
    isPublic?: boolean
    publicRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    files?: boolean | Drive$filesArgs<ExtArgs>
    access?: boolean | Drive$accessArgs<ExtArgs>
    _count?: boolean | DriveCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["drive"]>

  export type DriveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
    isPublic?: boolean
    publicRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["drive"]>

  export type DriveSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
    isPublic?: boolean
    publicRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["drive"]>

  export type DriveSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
    isPublic?: boolean
    publicRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DriveOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "ownerId" | "isPublic" | "publicRole" | "createdAt" | "updatedAt", ExtArgs["result"]["drive"]>
  export type DriveInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    files?: boolean | Drive$filesArgs<ExtArgs>
    access?: boolean | Drive$accessArgs<ExtArgs>
    _count?: boolean | DriveCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DriveIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DriveIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DrivePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Drive"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      files: Prisma.$MediaPayload<ExtArgs>[]
      access: Prisma.$DriveAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      ownerId: string
      isPublic: boolean
      publicRole: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["drive"]>
    composites: {}
  }

  type DriveGetPayload<S extends boolean | null | undefined | DriveDefaultArgs> = $Result.GetResult<Prisma.$DrivePayload, S>

  type DriveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriveCountAggregateInputType | true
    }

  export interface DriveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Drive'], meta: { name: 'Drive' } }
    /**
     * Find zero or one Drive that matches the filter.
     * @param {DriveFindUniqueArgs} args - Arguments to find a Drive
     * @example
     * // Get one Drive
     * const drive = await prisma.drive.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriveFindUniqueArgs>(args: SelectSubset<T, DriveFindUniqueArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Drive that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriveFindUniqueOrThrowArgs} args - Arguments to find a Drive
     * @example
     * // Get one Drive
     * const drive = await prisma.drive.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriveFindUniqueOrThrowArgs>(args: SelectSubset<T, DriveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drive that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveFindFirstArgs} args - Arguments to find a Drive
     * @example
     * // Get one Drive
     * const drive = await prisma.drive.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriveFindFirstArgs>(args?: SelectSubset<T, DriveFindFirstArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drive that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveFindFirstOrThrowArgs} args - Arguments to find a Drive
     * @example
     * // Get one Drive
     * const drive = await prisma.drive.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriveFindFirstOrThrowArgs>(args?: SelectSubset<T, DriveFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drives that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drives
     * const drives = await prisma.drive.findMany()
     * 
     * // Get first 10 Drives
     * const drives = await prisma.drive.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driveWithIdOnly = await prisma.drive.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriveFindManyArgs>(args?: SelectSubset<T, DriveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Drive.
     * @param {DriveCreateArgs} args - Arguments to create a Drive.
     * @example
     * // Create one Drive
     * const Drive = await prisma.drive.create({
     *   data: {
     *     // ... data to create a Drive
     *   }
     * })
     * 
     */
    create<T extends DriveCreateArgs>(args: SelectSubset<T, DriveCreateArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drives.
     * @param {DriveCreateManyArgs} args - Arguments to create many Drives.
     * @example
     * // Create many Drives
     * const drive = await prisma.drive.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriveCreateManyArgs>(args?: SelectSubset<T, DriveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drives and returns the data saved in the database.
     * @param {DriveCreateManyAndReturnArgs} args - Arguments to create many Drives.
     * @example
     * // Create many Drives
     * const drive = await prisma.drive.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drives and only return the `id`
     * const driveWithIdOnly = await prisma.drive.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriveCreateManyAndReturnArgs>(args?: SelectSubset<T, DriveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Drive.
     * @param {DriveDeleteArgs} args - Arguments to delete one Drive.
     * @example
     * // Delete one Drive
     * const Drive = await prisma.drive.delete({
     *   where: {
     *     // ... filter to delete one Drive
     *   }
     * })
     * 
     */
    delete<T extends DriveDeleteArgs>(args: SelectSubset<T, DriveDeleteArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Drive.
     * @param {DriveUpdateArgs} args - Arguments to update one Drive.
     * @example
     * // Update one Drive
     * const drive = await prisma.drive.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriveUpdateArgs>(args: SelectSubset<T, DriveUpdateArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drives.
     * @param {DriveDeleteManyArgs} args - Arguments to filter Drives to delete.
     * @example
     * // Delete a few Drives
     * const { count } = await prisma.drive.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriveDeleteManyArgs>(args?: SelectSubset<T, DriveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drives
     * const drive = await prisma.drive.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriveUpdateManyArgs>(args: SelectSubset<T, DriveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drives and returns the data updated in the database.
     * @param {DriveUpdateManyAndReturnArgs} args - Arguments to update many Drives.
     * @example
     * // Update many Drives
     * const drive = await prisma.drive.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drives and only return the `id`
     * const driveWithIdOnly = await prisma.drive.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DriveUpdateManyAndReturnArgs>(args: SelectSubset<T, DriveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Drive.
     * @param {DriveUpsertArgs} args - Arguments to update or create a Drive.
     * @example
     * // Update or create a Drive
     * const drive = await prisma.drive.upsert({
     *   create: {
     *     // ... data to create a Drive
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Drive we want to update
     *   }
     * })
     */
    upsert<T extends DriveUpsertArgs>(args: SelectSubset<T, DriveUpsertArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveCountArgs} args - Arguments to filter Drives to count.
     * @example
     * // Count the number of Drives
     * const count = await prisma.drive.count({
     *   where: {
     *     // ... the filter for the Drives we want to count
     *   }
     * })
    **/
    count<T extends DriveCountArgs>(
      args?: Subset<T, DriveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Drive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriveAggregateArgs>(args: Subset<T, DriveAggregateArgs>): Prisma.PrismaPromise<GetDriveAggregateType<T>>

    /**
     * Group by Drive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriveGroupByArgs['orderBy'] }
        : { orderBy?: DriveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Drive model
   */
  readonly fields: DriveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Drive.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    files<T extends Drive$filesArgs<ExtArgs> = {}>(args?: Subset<T, Drive$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    access<T extends Drive$accessArgs<ExtArgs> = {}>(args?: Subset<T, Drive$accessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Drive model
   */
  interface DriveFieldRefs {
    readonly id: FieldRef<"Drive", 'String'>
    readonly name: FieldRef<"Drive", 'String'>
    readonly description: FieldRef<"Drive", 'String'>
    readonly ownerId: FieldRef<"Drive", 'String'>
    readonly isPublic: FieldRef<"Drive", 'Boolean'>
    readonly publicRole: FieldRef<"Drive", 'String'>
    readonly createdAt: FieldRef<"Drive", 'DateTime'>
    readonly updatedAt: FieldRef<"Drive", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Drive findUnique
   */
  export type DriveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    /**
     * Filter, which Drive to fetch.
     */
    where: DriveWhereUniqueInput
  }

  /**
   * Drive findUniqueOrThrow
   */
  export type DriveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    /**
     * Filter, which Drive to fetch.
     */
    where: DriveWhereUniqueInput
  }

  /**
   * Drive findFirst
   */
  export type DriveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    /**
     * Filter, which Drive to fetch.
     */
    where?: DriveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drives to fetch.
     */
    orderBy?: DriveOrderByWithRelationInput | DriveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drives.
     */
    cursor?: DriveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drives.
     */
    distinct?: DriveScalarFieldEnum | DriveScalarFieldEnum[]
  }

  /**
   * Drive findFirstOrThrow
   */
  export type DriveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    /**
     * Filter, which Drive to fetch.
     */
    where?: DriveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drives to fetch.
     */
    orderBy?: DriveOrderByWithRelationInput | DriveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drives.
     */
    cursor?: DriveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drives.
     */
    distinct?: DriveScalarFieldEnum | DriveScalarFieldEnum[]
  }

  /**
   * Drive findMany
   */
  export type DriveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    /**
     * Filter, which Drives to fetch.
     */
    where?: DriveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drives to fetch.
     */
    orderBy?: DriveOrderByWithRelationInput | DriveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drives.
     */
    cursor?: DriveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drives.
     */
    skip?: number
    distinct?: DriveScalarFieldEnum | DriveScalarFieldEnum[]
  }

  /**
   * Drive create
   */
  export type DriveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    /**
     * The data needed to create a Drive.
     */
    data: XOR<DriveCreateInput, DriveUncheckedCreateInput>
  }

  /**
   * Drive createMany
   */
  export type DriveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drives.
     */
    data: DriveCreateManyInput | DriveCreateManyInput[]
  }

  /**
   * Drive createManyAndReturn
   */
  export type DriveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * The data used to create many Drives.
     */
    data: DriveCreateManyInput | DriveCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Drive update
   */
  export type DriveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    /**
     * The data needed to update a Drive.
     */
    data: XOR<DriveUpdateInput, DriveUncheckedUpdateInput>
    /**
     * Choose, which Drive to update.
     */
    where: DriveWhereUniqueInput
  }

  /**
   * Drive updateMany
   */
  export type DriveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drives.
     */
    data: XOR<DriveUpdateManyMutationInput, DriveUncheckedUpdateManyInput>
    /**
     * Filter which Drives to update
     */
    where?: DriveWhereInput
    /**
     * Limit how many Drives to update.
     */
    limit?: number
  }

  /**
   * Drive updateManyAndReturn
   */
  export type DriveUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * The data used to update Drives.
     */
    data: XOR<DriveUpdateManyMutationInput, DriveUncheckedUpdateManyInput>
    /**
     * Filter which Drives to update
     */
    where?: DriveWhereInput
    /**
     * Limit how many Drives to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Drive upsert
   */
  export type DriveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    /**
     * The filter to search for the Drive to update in case it exists.
     */
    where: DriveWhereUniqueInput
    /**
     * In case the Drive found by the `where` argument doesn't exist, create a new Drive with this data.
     */
    create: XOR<DriveCreateInput, DriveUncheckedCreateInput>
    /**
     * In case the Drive was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriveUpdateInput, DriveUncheckedUpdateInput>
  }

  /**
   * Drive delete
   */
  export type DriveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
    /**
     * Filter which Drive to delete.
     */
    where: DriveWhereUniqueInput
  }

  /**
   * Drive deleteMany
   */
  export type DriveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drives to delete
     */
    where?: DriveWhereInput
    /**
     * Limit how many Drives to delete.
     */
    limit?: number
  }

  /**
   * Drive.files
   */
  export type Drive$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    cursor?: MediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Drive.access
   */
  export type Drive$accessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    where?: DriveAccessWhereInput
    orderBy?: DriveAccessOrderByWithRelationInput | DriveAccessOrderByWithRelationInput[]
    cursor?: DriveAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DriveAccessScalarFieldEnum | DriveAccessScalarFieldEnum[]
  }

  /**
   * Drive without action
   */
  export type DriveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drive
     */
    select?: DriveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drive
     */
    omit?: DriveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveInclude<ExtArgs> | null
  }


  /**
   * Model DriveAccess
   */

  export type AggregateDriveAccess = {
    _count: DriveAccessCountAggregateOutputType | null
    _min: DriveAccessMinAggregateOutputType | null
    _max: DriveAccessMaxAggregateOutputType | null
  }

  export type DriveAccessMinAggregateOutputType = {
    id: string | null
    driveId: string | null
    userId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type DriveAccessMaxAggregateOutputType = {
    id: string | null
    driveId: string | null
    userId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type DriveAccessCountAggregateOutputType = {
    id: number
    driveId: number
    userId: number
    role: number
    createdAt: number
    _all: number
  }


  export type DriveAccessMinAggregateInputType = {
    id?: true
    driveId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type DriveAccessMaxAggregateInputType = {
    id?: true
    driveId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type DriveAccessCountAggregateInputType = {
    id?: true
    driveId?: true
    userId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type DriveAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriveAccess to aggregate.
     */
    where?: DriveAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriveAccesses to fetch.
     */
    orderBy?: DriveAccessOrderByWithRelationInput | DriveAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriveAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriveAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriveAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DriveAccesses
    **/
    _count?: true | DriveAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriveAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriveAccessMaxAggregateInputType
  }

  export type GetDriveAccessAggregateType<T extends DriveAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateDriveAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriveAccess[P]>
      : GetScalarType<T[P], AggregateDriveAccess[P]>
  }




  export type DriveAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriveAccessWhereInput
    orderBy?: DriveAccessOrderByWithAggregationInput | DriveAccessOrderByWithAggregationInput[]
    by: DriveAccessScalarFieldEnum[] | DriveAccessScalarFieldEnum
    having?: DriveAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriveAccessCountAggregateInputType | true
    _min?: DriveAccessMinAggregateInputType
    _max?: DriveAccessMaxAggregateInputType
  }

  export type DriveAccessGroupByOutputType = {
    id: string
    driveId: string
    userId: string
    role: string
    createdAt: Date
    _count: DriveAccessCountAggregateOutputType | null
    _min: DriveAccessMinAggregateOutputType | null
    _max: DriveAccessMaxAggregateOutputType | null
  }

  type GetDriveAccessGroupByPayload<T extends DriveAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriveAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriveAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriveAccessGroupByOutputType[P]>
            : GetScalarType<T[P], DriveAccessGroupByOutputType[P]>
        }
      >
    >


  export type DriveAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driveId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    drive?: boolean | DriveDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driveAccess"]>

  export type DriveAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driveId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    drive?: boolean | DriveDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driveAccess"]>

  export type DriveAccessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driveId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    drive?: boolean | DriveDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driveAccess"]>

  export type DriveAccessSelectScalar = {
    id?: boolean
    driveId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type DriveAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "driveId" | "userId" | "role" | "createdAt", ExtArgs["result"]["driveAccess"]>
  export type DriveAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drive?: boolean | DriveDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DriveAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drive?: boolean | DriveDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DriveAccessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drive?: boolean | DriveDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DriveAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DriveAccess"
    objects: {
      drive: Prisma.$DrivePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      driveId: string
      userId: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["driveAccess"]>
    composites: {}
  }

  type DriveAccessGetPayload<S extends boolean | null | undefined | DriveAccessDefaultArgs> = $Result.GetResult<Prisma.$DriveAccessPayload, S>

  type DriveAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriveAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriveAccessCountAggregateInputType | true
    }

  export interface DriveAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DriveAccess'], meta: { name: 'DriveAccess' } }
    /**
     * Find zero or one DriveAccess that matches the filter.
     * @param {DriveAccessFindUniqueArgs} args - Arguments to find a DriveAccess
     * @example
     * // Get one DriveAccess
     * const driveAccess = await prisma.driveAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriveAccessFindUniqueArgs>(args: SelectSubset<T, DriveAccessFindUniqueArgs<ExtArgs>>): Prisma__DriveAccessClient<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DriveAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriveAccessFindUniqueOrThrowArgs} args - Arguments to find a DriveAccess
     * @example
     * // Get one DriveAccess
     * const driveAccess = await prisma.driveAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriveAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, DriveAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriveAccessClient<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriveAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveAccessFindFirstArgs} args - Arguments to find a DriveAccess
     * @example
     * // Get one DriveAccess
     * const driveAccess = await prisma.driveAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriveAccessFindFirstArgs>(args?: SelectSubset<T, DriveAccessFindFirstArgs<ExtArgs>>): Prisma__DriveAccessClient<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriveAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveAccessFindFirstOrThrowArgs} args - Arguments to find a DriveAccess
     * @example
     * // Get one DriveAccess
     * const driveAccess = await prisma.driveAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriveAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, DriveAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriveAccessClient<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DriveAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DriveAccesses
     * const driveAccesses = await prisma.driveAccess.findMany()
     * 
     * // Get first 10 DriveAccesses
     * const driveAccesses = await prisma.driveAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driveAccessWithIdOnly = await prisma.driveAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriveAccessFindManyArgs>(args?: SelectSubset<T, DriveAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DriveAccess.
     * @param {DriveAccessCreateArgs} args - Arguments to create a DriveAccess.
     * @example
     * // Create one DriveAccess
     * const DriveAccess = await prisma.driveAccess.create({
     *   data: {
     *     // ... data to create a DriveAccess
     *   }
     * })
     * 
     */
    create<T extends DriveAccessCreateArgs>(args: SelectSubset<T, DriveAccessCreateArgs<ExtArgs>>): Prisma__DriveAccessClient<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DriveAccesses.
     * @param {DriveAccessCreateManyArgs} args - Arguments to create many DriveAccesses.
     * @example
     * // Create many DriveAccesses
     * const driveAccess = await prisma.driveAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriveAccessCreateManyArgs>(args?: SelectSubset<T, DriveAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DriveAccesses and returns the data saved in the database.
     * @param {DriveAccessCreateManyAndReturnArgs} args - Arguments to create many DriveAccesses.
     * @example
     * // Create many DriveAccesses
     * const driveAccess = await prisma.driveAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DriveAccesses and only return the `id`
     * const driveAccessWithIdOnly = await prisma.driveAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriveAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, DriveAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DriveAccess.
     * @param {DriveAccessDeleteArgs} args - Arguments to delete one DriveAccess.
     * @example
     * // Delete one DriveAccess
     * const DriveAccess = await prisma.driveAccess.delete({
     *   where: {
     *     // ... filter to delete one DriveAccess
     *   }
     * })
     * 
     */
    delete<T extends DriveAccessDeleteArgs>(args: SelectSubset<T, DriveAccessDeleteArgs<ExtArgs>>): Prisma__DriveAccessClient<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DriveAccess.
     * @param {DriveAccessUpdateArgs} args - Arguments to update one DriveAccess.
     * @example
     * // Update one DriveAccess
     * const driveAccess = await prisma.driveAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriveAccessUpdateArgs>(args: SelectSubset<T, DriveAccessUpdateArgs<ExtArgs>>): Prisma__DriveAccessClient<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DriveAccesses.
     * @param {DriveAccessDeleteManyArgs} args - Arguments to filter DriveAccesses to delete.
     * @example
     * // Delete a few DriveAccesses
     * const { count } = await prisma.driveAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriveAccessDeleteManyArgs>(args?: SelectSubset<T, DriveAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriveAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DriveAccesses
     * const driveAccess = await prisma.driveAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriveAccessUpdateManyArgs>(args: SelectSubset<T, DriveAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriveAccesses and returns the data updated in the database.
     * @param {DriveAccessUpdateManyAndReturnArgs} args - Arguments to update many DriveAccesses.
     * @example
     * // Update many DriveAccesses
     * const driveAccess = await prisma.driveAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DriveAccesses and only return the `id`
     * const driveAccessWithIdOnly = await prisma.driveAccess.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DriveAccessUpdateManyAndReturnArgs>(args: SelectSubset<T, DriveAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DriveAccess.
     * @param {DriveAccessUpsertArgs} args - Arguments to update or create a DriveAccess.
     * @example
     * // Update or create a DriveAccess
     * const driveAccess = await prisma.driveAccess.upsert({
     *   create: {
     *     // ... data to create a DriveAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DriveAccess we want to update
     *   }
     * })
     */
    upsert<T extends DriveAccessUpsertArgs>(args: SelectSubset<T, DriveAccessUpsertArgs<ExtArgs>>): Prisma__DriveAccessClient<$Result.GetResult<Prisma.$DriveAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DriveAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveAccessCountArgs} args - Arguments to filter DriveAccesses to count.
     * @example
     * // Count the number of DriveAccesses
     * const count = await prisma.driveAccess.count({
     *   where: {
     *     // ... the filter for the DriveAccesses we want to count
     *   }
     * })
    **/
    count<T extends DriveAccessCountArgs>(
      args?: Subset<T, DriveAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriveAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DriveAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriveAccessAggregateArgs>(args: Subset<T, DriveAccessAggregateArgs>): Prisma.PrismaPromise<GetDriveAccessAggregateType<T>>

    /**
     * Group by DriveAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriveAccessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriveAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriveAccessGroupByArgs['orderBy'] }
        : { orderBy?: DriveAccessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriveAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriveAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DriveAccess model
   */
  readonly fields: DriveAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DriveAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriveAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    drive<T extends DriveDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DriveDefaultArgs<ExtArgs>>): Prisma__DriveClient<$Result.GetResult<Prisma.$DrivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DriveAccess model
   */
  interface DriveAccessFieldRefs {
    readonly id: FieldRef<"DriveAccess", 'String'>
    readonly driveId: FieldRef<"DriveAccess", 'String'>
    readonly userId: FieldRef<"DriveAccess", 'String'>
    readonly role: FieldRef<"DriveAccess", 'String'>
    readonly createdAt: FieldRef<"DriveAccess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DriveAccess findUnique
   */
  export type DriveAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    /**
     * Filter, which DriveAccess to fetch.
     */
    where: DriveAccessWhereUniqueInput
  }

  /**
   * DriveAccess findUniqueOrThrow
   */
  export type DriveAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    /**
     * Filter, which DriveAccess to fetch.
     */
    where: DriveAccessWhereUniqueInput
  }

  /**
   * DriveAccess findFirst
   */
  export type DriveAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    /**
     * Filter, which DriveAccess to fetch.
     */
    where?: DriveAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriveAccesses to fetch.
     */
    orderBy?: DriveAccessOrderByWithRelationInput | DriveAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriveAccesses.
     */
    cursor?: DriveAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriveAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriveAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriveAccesses.
     */
    distinct?: DriveAccessScalarFieldEnum | DriveAccessScalarFieldEnum[]
  }

  /**
   * DriveAccess findFirstOrThrow
   */
  export type DriveAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    /**
     * Filter, which DriveAccess to fetch.
     */
    where?: DriveAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriveAccesses to fetch.
     */
    orderBy?: DriveAccessOrderByWithRelationInput | DriveAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriveAccesses.
     */
    cursor?: DriveAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriveAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriveAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriveAccesses.
     */
    distinct?: DriveAccessScalarFieldEnum | DriveAccessScalarFieldEnum[]
  }

  /**
   * DriveAccess findMany
   */
  export type DriveAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    /**
     * Filter, which DriveAccesses to fetch.
     */
    where?: DriveAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriveAccesses to fetch.
     */
    orderBy?: DriveAccessOrderByWithRelationInput | DriveAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DriveAccesses.
     */
    cursor?: DriveAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriveAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriveAccesses.
     */
    skip?: number
    distinct?: DriveAccessScalarFieldEnum | DriveAccessScalarFieldEnum[]
  }

  /**
   * DriveAccess create
   */
  export type DriveAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a DriveAccess.
     */
    data: XOR<DriveAccessCreateInput, DriveAccessUncheckedCreateInput>
  }

  /**
   * DriveAccess createMany
   */
  export type DriveAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DriveAccesses.
     */
    data: DriveAccessCreateManyInput | DriveAccessCreateManyInput[]
  }

  /**
   * DriveAccess createManyAndReturn
   */
  export type DriveAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * The data used to create many DriveAccesses.
     */
    data: DriveAccessCreateManyInput | DriveAccessCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DriveAccess update
   */
  export type DriveAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a DriveAccess.
     */
    data: XOR<DriveAccessUpdateInput, DriveAccessUncheckedUpdateInput>
    /**
     * Choose, which DriveAccess to update.
     */
    where: DriveAccessWhereUniqueInput
  }

  /**
   * DriveAccess updateMany
   */
  export type DriveAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DriveAccesses.
     */
    data: XOR<DriveAccessUpdateManyMutationInput, DriveAccessUncheckedUpdateManyInput>
    /**
     * Filter which DriveAccesses to update
     */
    where?: DriveAccessWhereInput
    /**
     * Limit how many DriveAccesses to update.
     */
    limit?: number
  }

  /**
   * DriveAccess updateManyAndReturn
   */
  export type DriveAccessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * The data used to update DriveAccesses.
     */
    data: XOR<DriveAccessUpdateManyMutationInput, DriveAccessUncheckedUpdateManyInput>
    /**
     * Filter which DriveAccesses to update
     */
    where?: DriveAccessWhereInput
    /**
     * Limit how many DriveAccesses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DriveAccess upsert
   */
  export type DriveAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the DriveAccess to update in case it exists.
     */
    where: DriveAccessWhereUniqueInput
    /**
     * In case the DriveAccess found by the `where` argument doesn't exist, create a new DriveAccess with this data.
     */
    create: XOR<DriveAccessCreateInput, DriveAccessUncheckedCreateInput>
    /**
     * In case the DriveAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriveAccessUpdateInput, DriveAccessUncheckedUpdateInput>
  }

  /**
   * DriveAccess delete
   */
  export type DriveAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
    /**
     * Filter which DriveAccess to delete.
     */
    where: DriveAccessWhereUniqueInput
  }

  /**
   * DriveAccess deleteMany
   */
  export type DriveAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriveAccesses to delete
     */
    where?: DriveAccessWhereInput
    /**
     * Limit how many DriveAccesses to delete.
     */
    limit?: number
  }

  /**
   * DriveAccess without action
   */
  export type DriveAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriveAccess
     */
    select?: DriveAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriveAccess
     */
    omit?: DriveAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriveAccessInclude<ExtArgs> | null
  }


  /**
   * Model Settings
   */

  export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  export type SettingsAvgAggregateOutputType = {
    maxFileSize: number | null
    rateLimitWindow: number | null
    smtpPort: number | null
  }

  export type SettingsSumAggregateOutputType = {
    maxFileSize: bigint | null
    rateLimitWindow: number | null
    smtpPort: number | null
  }

  export type SettingsMinAggregateOutputType = {
    id: string | null
    allowPublicUpload: boolean | null
    allowRegistration: boolean | null
    maxFileSize: bigint | null
    rateLimitWindow: number | null
    defaultCompression: string | null
    showNoCompression: boolean | null
    showPrivateOption: boolean | null
    forcePrivate: boolean | null
    smtpHost: string | null
    smtpPort: number | null
    smtpUser: string | null
    smtpPassword: string | null
    smtpFrom: string | null
  }

  export type SettingsMaxAggregateOutputType = {
    id: string | null
    allowPublicUpload: boolean | null
    allowRegistration: boolean | null
    maxFileSize: bigint | null
    rateLimitWindow: number | null
    defaultCompression: string | null
    showNoCompression: boolean | null
    showPrivateOption: boolean | null
    forcePrivate: boolean | null
    smtpHost: string | null
    smtpPort: number | null
    smtpUser: string | null
    smtpPassword: string | null
    smtpFrom: string | null
  }

  export type SettingsCountAggregateOutputType = {
    id: number
    allowPublicUpload: number
    allowRegistration: number
    maxFileSize: number
    rateLimitWindow: number
    defaultCompression: number
    showNoCompression: number
    showPrivateOption: number
    forcePrivate: number
    smtpHost: number
    smtpPort: number
    smtpUser: number
    smtpPassword: number
    smtpFrom: number
    _all: number
  }


  export type SettingsAvgAggregateInputType = {
    maxFileSize?: true
    rateLimitWindow?: true
    smtpPort?: true
  }

  export type SettingsSumAggregateInputType = {
    maxFileSize?: true
    rateLimitWindow?: true
    smtpPort?: true
  }

  export type SettingsMinAggregateInputType = {
    id?: true
    allowPublicUpload?: true
    allowRegistration?: true
    maxFileSize?: true
    rateLimitWindow?: true
    defaultCompression?: true
    showNoCompression?: true
    showPrivateOption?: true
    forcePrivate?: true
    smtpHost?: true
    smtpPort?: true
    smtpUser?: true
    smtpPassword?: true
    smtpFrom?: true
  }

  export type SettingsMaxAggregateInputType = {
    id?: true
    allowPublicUpload?: true
    allowRegistration?: true
    maxFileSize?: true
    rateLimitWindow?: true
    defaultCompression?: true
    showNoCompression?: true
    showPrivateOption?: true
    forcePrivate?: true
    smtpHost?: true
    smtpPort?: true
    smtpUser?: true
    smtpPassword?: true
    smtpFrom?: true
  }

  export type SettingsCountAggregateInputType = {
    id?: true
    allowPublicUpload?: true
    allowRegistration?: true
    maxFileSize?: true
    rateLimitWindow?: true
    defaultCompression?: true
    showNoCompression?: true
    showPrivateOption?: true
    forcePrivate?: true
    smtpHost?: true
    smtpPort?: true
    smtpUser?: true
    smtpPassword?: true
    smtpFrom?: true
    _all?: true
  }

  export type SettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to aggregate.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingsMaxAggregateInputType
  }

  export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettings[P]>
      : GetScalarType<T[P], AggregateSettings[P]>
  }




  export type SettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingsWhereInput
    orderBy?: SettingsOrderByWithAggregationInput | SettingsOrderByWithAggregationInput[]
    by: SettingsScalarFieldEnum[] | SettingsScalarFieldEnum
    having?: SettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingsCountAggregateInputType | true
    _avg?: SettingsAvgAggregateInputType
    _sum?: SettingsSumAggregateInputType
    _min?: SettingsMinAggregateInputType
    _max?: SettingsMaxAggregateInputType
  }

  export type SettingsGroupByOutputType = {
    id: string
    allowPublicUpload: boolean
    allowRegistration: boolean
    maxFileSize: bigint
    rateLimitWindow: number
    defaultCompression: string
    showNoCompression: boolean
    showPrivateOption: boolean
    forcePrivate: boolean
    smtpHost: string | null
    smtpPort: number | null
    smtpUser: string | null
    smtpPassword: string | null
    smtpFrom: string | null
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  type GetSettingsGroupByPayload<T extends SettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SettingsGroupByOutputType[P]>
        }
      >
    >


  export type SettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    allowPublicUpload?: boolean
    allowRegistration?: boolean
    maxFileSize?: boolean
    rateLimitWindow?: boolean
    defaultCompression?: boolean
    showNoCompression?: boolean
    showPrivateOption?: boolean
    forcePrivate?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPassword?: boolean
    smtpFrom?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    allowPublicUpload?: boolean
    allowRegistration?: boolean
    maxFileSize?: boolean
    rateLimitWindow?: boolean
    defaultCompression?: boolean
    showNoCompression?: boolean
    showPrivateOption?: boolean
    forcePrivate?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPassword?: boolean
    smtpFrom?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    allowPublicUpload?: boolean
    allowRegistration?: boolean
    maxFileSize?: boolean
    rateLimitWindow?: boolean
    defaultCompression?: boolean
    showNoCompression?: boolean
    showPrivateOption?: boolean
    forcePrivate?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPassword?: boolean
    smtpFrom?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectScalar = {
    id?: boolean
    allowPublicUpload?: boolean
    allowRegistration?: boolean
    maxFileSize?: boolean
    rateLimitWindow?: boolean
    defaultCompression?: boolean
    showNoCompression?: boolean
    showPrivateOption?: boolean
    forcePrivate?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPassword?: boolean
    smtpFrom?: boolean
  }

  export type SettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "allowPublicUpload" | "allowRegistration" | "maxFileSize" | "rateLimitWindow" | "defaultCompression" | "showNoCompression" | "showPrivateOption" | "forcePrivate" | "smtpHost" | "smtpPort" | "smtpUser" | "smtpPassword" | "smtpFrom", ExtArgs["result"]["settings"]>

  export type $SettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Settings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      allowPublicUpload: boolean
      allowRegistration: boolean
      maxFileSize: bigint
      rateLimitWindow: number
      defaultCompression: string
      showNoCompression: boolean
      showPrivateOption: boolean
      forcePrivate: boolean
      smtpHost: string | null
      smtpPort: number | null
      smtpUser: string | null
      smtpPassword: string | null
      smtpFrom: string | null
    }, ExtArgs["result"]["settings"]>
    composites: {}
  }

  type SettingsGetPayload<S extends boolean | null | undefined | SettingsDefaultArgs> = $Result.GetResult<Prisma.$SettingsPayload, S>

  type SettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettingsCountAggregateInputType | true
    }

  export interface SettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Settings'], meta: { name: 'Settings' } }
    /**
     * Find zero or one Settings that matches the filter.
     * @param {SettingsFindUniqueArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingsFindUniqueArgs>(args: SelectSubset<T, SettingsFindUniqueArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Settings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SettingsFindUniqueOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingsFindFirstArgs>(args?: SelectSubset<T, SettingsFindFirstArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.settings.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingsWithIdOnly = await prisma.settings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingsFindManyArgs>(args?: SelectSubset<T, SettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Settings.
     * @param {SettingsCreateArgs} args - Arguments to create a Settings.
     * @example
     * // Create one Settings
     * const Settings = await prisma.settings.create({
     *   data: {
     *     // ... data to create a Settings
     *   }
     * })
     * 
     */
    create<T extends SettingsCreateArgs>(args: SelectSubset<T, SettingsCreateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settings.
     * @param {SettingsCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingsCreateManyArgs>(args?: SelectSubset<T, SettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingsCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Settings.
     * @param {SettingsDeleteArgs} args - Arguments to delete one Settings.
     * @example
     * // Delete one Settings
     * const Settings = await prisma.settings.delete({
     *   where: {
     *     // ... filter to delete one Settings
     *   }
     * })
     * 
     */
    delete<T extends SettingsDeleteArgs>(args: SelectSubset<T, SettingsDeleteArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Settings.
     * @param {SettingsUpdateArgs} args - Arguments to update one Settings.
     * @example
     * // Update one Settings
     * const settings = await prisma.settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingsUpdateArgs>(args: SelectSubset<T, SettingsUpdateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settings.
     * @param {SettingsDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingsDeleteManyArgs>(args?: SelectSubset<T, SettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingsUpdateManyArgs>(args: SelectSubset<T, SettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings and returns the data updated in the database.
     * @param {SettingsUpdateManyAndReturnArgs} args - Arguments to update many Settings.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, SettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Settings.
     * @param {SettingsUpsertArgs} args - Arguments to update or create a Settings.
     * @example
     * // Update or create a Settings
     * const settings = await prisma.settings.upsert({
     *   create: {
     *     // ... data to create a Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settings we want to update
     *   }
     * })
     */
    upsert<T extends SettingsUpsertArgs>(args: SelectSubset<T, SettingsUpsertArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.settings.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingsCountArgs>(
      args?: Subset<T, SettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingsAggregateArgs>(args: Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>

    /**
     * Group by Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingsGroupByArgs['orderBy'] }
        : { orderBy?: SettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Settings model
   */
  readonly fields: SettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Settings model
   */
  interface SettingsFieldRefs {
    readonly id: FieldRef<"Settings", 'String'>
    readonly allowPublicUpload: FieldRef<"Settings", 'Boolean'>
    readonly allowRegistration: FieldRef<"Settings", 'Boolean'>
    readonly maxFileSize: FieldRef<"Settings", 'BigInt'>
    readonly rateLimitWindow: FieldRef<"Settings", 'Int'>
    readonly defaultCompression: FieldRef<"Settings", 'String'>
    readonly showNoCompression: FieldRef<"Settings", 'Boolean'>
    readonly showPrivateOption: FieldRef<"Settings", 'Boolean'>
    readonly forcePrivate: FieldRef<"Settings", 'Boolean'>
    readonly smtpHost: FieldRef<"Settings", 'String'>
    readonly smtpPort: FieldRef<"Settings", 'Int'>
    readonly smtpUser: FieldRef<"Settings", 'String'>
    readonly smtpPassword: FieldRef<"Settings", 'String'>
    readonly smtpFrom: FieldRef<"Settings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Settings findUnique
   */
  export type SettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findUniqueOrThrow
   */
  export type SettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findFirst
   */
  export type SettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findFirstOrThrow
   */
  export type SettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findMany
   */
  export type SettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings create
   */
  export type SettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a Settings.
     */
    data?: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
  }

  /**
   * Settings createMany
   */
  export type SettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
  }

  /**
   * Settings createManyAndReturn
   */
  export type SettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
  }

  /**
   * Settings update
   */
  export type SettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a Settings.
     */
    data: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
    /**
     * Choose, which Settings to update.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings updateMany
   */
  export type SettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Settings updateManyAndReturn
   */
  export type SettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Settings upsert
   */
  export type SettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the Settings to update in case it exists.
     */
    where: SettingsWhereUniqueInput
    /**
     * In case the Settings found by the `where` argument doesn't exist, create a new Settings with this data.
     */
    create: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
    /**
     * In case the Settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
  }

  /**
   * Settings delete
   */
  export type SettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter which Settings to delete.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings deleteMany
   */
  export type SettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to delete.
     */
    limit?: number
  }

  /**
   * Settings without action
   */
  export type SettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    isAdmin: 'isAdmin',
    mustChangePassword: 'mustChangePassword',
    createdAt: 'createdAt',
    customMaxFileSize: 'customMaxFileSize',
    customRateLimitWindow: 'customRateLimitWindow'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MediaScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    originalName: 'originalName',
    mimeType: 'mimeType',
    size: 'size',
    ip: 'ip',
    userId: 'userId',
    isPrivate: 'isPrivate',
    transcodeStatus: 'transcodeStatus',
    transcodeError: 'transcodeError',
    createdAt: 'createdAt',
    driveId: 'driveId'
  };

  export type MediaScalarFieldEnum = (typeof MediaScalarFieldEnum)[keyof typeof MediaScalarFieldEnum]


  export const DriveScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    ownerId: 'ownerId',
    isPublic: 'isPublic',
    publicRole: 'publicRole',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DriveScalarFieldEnum = (typeof DriveScalarFieldEnum)[keyof typeof DriveScalarFieldEnum]


  export const DriveAccessScalarFieldEnum: {
    id: 'id',
    driveId: 'driveId',
    userId: 'userId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type DriveAccessScalarFieldEnum = (typeof DriveAccessScalarFieldEnum)[keyof typeof DriveAccessScalarFieldEnum]


  export const SettingsScalarFieldEnum: {
    id: 'id',
    allowPublicUpload: 'allowPublicUpload',
    allowRegistration: 'allowRegistration',
    maxFileSize: 'maxFileSize',
    rateLimitWindow: 'rateLimitWindow',
    defaultCompression: 'defaultCompression',
    showNoCompression: 'showNoCompression',
    showPrivateOption: 'showPrivateOption',
    forcePrivate: 'forcePrivate',
    smtpHost: 'smtpHost',
    smtpPort: 'smtpPort',
    smtpUser: 'smtpUser',
    smtpPassword: 'smtpPassword',
    smtpFrom: 'smtpFrom'
  };

  export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isAdmin?: BoolFilter<"User"> | boolean
    mustChangePassword?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    customMaxFileSize?: BigIntNullableFilter<"User"> | bigint | number | null
    customRateLimitWindow?: IntNullableFilter<"User"> | number | null
    media?: MediaListRelationFilter
    ownedDrives?: DriveListRelationFilter
    driveAccess?: DriveAccessListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    customMaxFileSize?: SortOrderInput | SortOrder
    customRateLimitWindow?: SortOrderInput | SortOrder
    media?: MediaOrderByRelationAggregateInput
    ownedDrives?: DriveOrderByRelationAggregateInput
    driveAccess?: DriveAccessOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    isAdmin?: BoolFilter<"User"> | boolean
    mustChangePassword?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    customMaxFileSize?: BigIntNullableFilter<"User"> | bigint | number | null
    customRateLimitWindow?: IntNullableFilter<"User"> | number | null
    media?: MediaListRelationFilter
    ownedDrives?: DriveListRelationFilter
    driveAccess?: DriveAccessListRelationFilter
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    customMaxFileSize?: SortOrderInput | SortOrder
    customRateLimitWindow?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    mustChangePassword?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    customMaxFileSize?: BigIntNullableWithAggregatesFilter<"User"> | bigint | number | null
    customRateLimitWindow?: IntNullableWithAggregatesFilter<"User"> | number | null
  }

  export type MediaWhereInput = {
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    id?: StringFilter<"Media"> | string
    filename?: StringFilter<"Media"> | string
    originalName?: StringFilter<"Media"> | string
    mimeType?: StringFilter<"Media"> | string
    size?: IntFilter<"Media"> | number
    ip?: StringNullableFilter<"Media"> | string | null
    userId?: StringNullableFilter<"Media"> | string | null
    isPrivate?: BoolFilter<"Media"> | boolean
    transcodeStatus?: StringFilter<"Media"> | string
    transcodeError?: StringNullableFilter<"Media"> | string | null
    createdAt?: DateTimeFilter<"Media"> | Date | string
    driveId?: StringNullableFilter<"Media"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    drive?: XOR<DriveNullableScalarRelationFilter, DriveWhereInput> | null
  }

  export type MediaOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    ip?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    transcodeStatus?: SortOrder
    transcodeError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    driveId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    drive?: DriveOrderByWithRelationInput
  }

  export type MediaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    filename?: StringFilter<"Media"> | string
    originalName?: StringFilter<"Media"> | string
    mimeType?: StringFilter<"Media"> | string
    size?: IntFilter<"Media"> | number
    ip?: StringNullableFilter<"Media"> | string | null
    userId?: StringNullableFilter<"Media"> | string | null
    isPrivate?: BoolFilter<"Media"> | boolean
    transcodeStatus?: StringFilter<"Media"> | string
    transcodeError?: StringNullableFilter<"Media"> | string | null
    createdAt?: DateTimeFilter<"Media"> | Date | string
    driveId?: StringNullableFilter<"Media"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    drive?: XOR<DriveNullableScalarRelationFilter, DriveWhereInput> | null
  }, "id">

  export type MediaOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    ip?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    transcodeStatus?: SortOrder
    transcodeError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    driveId?: SortOrderInput | SortOrder
    _count?: MediaCountOrderByAggregateInput
    _avg?: MediaAvgOrderByAggregateInput
    _max?: MediaMaxOrderByAggregateInput
    _min?: MediaMinOrderByAggregateInput
    _sum?: MediaSumOrderByAggregateInput
  }

  export type MediaScalarWhereWithAggregatesInput = {
    AND?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    OR?: MediaScalarWhereWithAggregatesInput[]
    NOT?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Media"> | string
    filename?: StringWithAggregatesFilter<"Media"> | string
    originalName?: StringWithAggregatesFilter<"Media"> | string
    mimeType?: StringWithAggregatesFilter<"Media"> | string
    size?: IntWithAggregatesFilter<"Media"> | number
    ip?: StringNullableWithAggregatesFilter<"Media"> | string | null
    userId?: StringNullableWithAggregatesFilter<"Media"> | string | null
    isPrivate?: BoolWithAggregatesFilter<"Media"> | boolean
    transcodeStatus?: StringWithAggregatesFilter<"Media"> | string
    transcodeError?: StringNullableWithAggregatesFilter<"Media"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Media"> | Date | string
    driveId?: StringNullableWithAggregatesFilter<"Media"> | string | null
  }

  export type DriveWhereInput = {
    AND?: DriveWhereInput | DriveWhereInput[]
    OR?: DriveWhereInput[]
    NOT?: DriveWhereInput | DriveWhereInput[]
    id?: StringFilter<"Drive"> | string
    name?: StringFilter<"Drive"> | string
    description?: StringNullableFilter<"Drive"> | string | null
    ownerId?: StringFilter<"Drive"> | string
    isPublic?: BoolFilter<"Drive"> | boolean
    publicRole?: StringFilter<"Drive"> | string
    createdAt?: DateTimeFilter<"Drive"> | Date | string
    updatedAt?: DateTimeFilter<"Drive"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    files?: MediaListRelationFilter
    access?: DriveAccessListRelationFilter
  }

  export type DriveOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    isPublic?: SortOrder
    publicRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    files?: MediaOrderByRelationAggregateInput
    access?: DriveAccessOrderByRelationAggregateInput
  }

  export type DriveWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DriveWhereInput | DriveWhereInput[]
    OR?: DriveWhereInput[]
    NOT?: DriveWhereInput | DriveWhereInput[]
    name?: StringFilter<"Drive"> | string
    description?: StringNullableFilter<"Drive"> | string | null
    ownerId?: StringFilter<"Drive"> | string
    isPublic?: BoolFilter<"Drive"> | boolean
    publicRole?: StringFilter<"Drive"> | string
    createdAt?: DateTimeFilter<"Drive"> | Date | string
    updatedAt?: DateTimeFilter<"Drive"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    files?: MediaListRelationFilter
    access?: DriveAccessListRelationFilter
  }, "id">

  export type DriveOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    isPublic?: SortOrder
    publicRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DriveCountOrderByAggregateInput
    _max?: DriveMaxOrderByAggregateInput
    _min?: DriveMinOrderByAggregateInput
  }

  export type DriveScalarWhereWithAggregatesInput = {
    AND?: DriveScalarWhereWithAggregatesInput | DriveScalarWhereWithAggregatesInput[]
    OR?: DriveScalarWhereWithAggregatesInput[]
    NOT?: DriveScalarWhereWithAggregatesInput | DriveScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Drive"> | string
    name?: StringWithAggregatesFilter<"Drive"> | string
    description?: StringNullableWithAggregatesFilter<"Drive"> | string | null
    ownerId?: StringWithAggregatesFilter<"Drive"> | string
    isPublic?: BoolWithAggregatesFilter<"Drive"> | boolean
    publicRole?: StringWithAggregatesFilter<"Drive"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Drive"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Drive"> | Date | string
  }

  export type DriveAccessWhereInput = {
    AND?: DriveAccessWhereInput | DriveAccessWhereInput[]
    OR?: DriveAccessWhereInput[]
    NOT?: DriveAccessWhereInput | DriveAccessWhereInput[]
    id?: StringFilter<"DriveAccess"> | string
    driveId?: StringFilter<"DriveAccess"> | string
    userId?: StringFilter<"DriveAccess"> | string
    role?: StringFilter<"DriveAccess"> | string
    createdAt?: DateTimeFilter<"DriveAccess"> | Date | string
    drive?: XOR<DriveScalarRelationFilter, DriveWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DriveAccessOrderByWithRelationInput = {
    id?: SortOrder
    driveId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    drive?: DriveOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type DriveAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    driveId_userId?: DriveAccessDriveIdUserIdCompoundUniqueInput
    AND?: DriveAccessWhereInput | DriveAccessWhereInput[]
    OR?: DriveAccessWhereInput[]
    NOT?: DriveAccessWhereInput | DriveAccessWhereInput[]
    driveId?: StringFilter<"DriveAccess"> | string
    userId?: StringFilter<"DriveAccess"> | string
    role?: StringFilter<"DriveAccess"> | string
    createdAt?: DateTimeFilter<"DriveAccess"> | Date | string
    drive?: XOR<DriveScalarRelationFilter, DriveWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "driveId_userId">

  export type DriveAccessOrderByWithAggregationInput = {
    id?: SortOrder
    driveId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: DriveAccessCountOrderByAggregateInput
    _max?: DriveAccessMaxOrderByAggregateInput
    _min?: DriveAccessMinOrderByAggregateInput
  }

  export type DriveAccessScalarWhereWithAggregatesInput = {
    AND?: DriveAccessScalarWhereWithAggregatesInput | DriveAccessScalarWhereWithAggregatesInput[]
    OR?: DriveAccessScalarWhereWithAggregatesInput[]
    NOT?: DriveAccessScalarWhereWithAggregatesInput | DriveAccessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DriveAccess"> | string
    driveId?: StringWithAggregatesFilter<"DriveAccess"> | string
    userId?: StringWithAggregatesFilter<"DriveAccess"> | string
    role?: StringWithAggregatesFilter<"DriveAccess"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DriveAccess"> | Date | string
  }

  export type SettingsWhereInput = {
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    id?: StringFilter<"Settings"> | string
    allowPublicUpload?: BoolFilter<"Settings"> | boolean
    allowRegistration?: BoolFilter<"Settings"> | boolean
    maxFileSize?: BigIntFilter<"Settings"> | bigint | number
    rateLimitWindow?: IntFilter<"Settings"> | number
    defaultCompression?: StringFilter<"Settings"> | string
    showNoCompression?: BoolFilter<"Settings"> | boolean
    showPrivateOption?: BoolFilter<"Settings"> | boolean
    forcePrivate?: BoolFilter<"Settings"> | boolean
    smtpHost?: StringNullableFilter<"Settings"> | string | null
    smtpPort?: IntNullableFilter<"Settings"> | number | null
    smtpUser?: StringNullableFilter<"Settings"> | string | null
    smtpPassword?: StringNullableFilter<"Settings"> | string | null
    smtpFrom?: StringNullableFilter<"Settings"> | string | null
  }

  export type SettingsOrderByWithRelationInput = {
    id?: SortOrder
    allowPublicUpload?: SortOrder
    allowRegistration?: SortOrder
    maxFileSize?: SortOrder
    rateLimitWindow?: SortOrder
    defaultCompression?: SortOrder
    showNoCompression?: SortOrder
    showPrivateOption?: SortOrder
    forcePrivate?: SortOrder
    smtpHost?: SortOrderInput | SortOrder
    smtpPort?: SortOrderInput | SortOrder
    smtpUser?: SortOrderInput | SortOrder
    smtpPassword?: SortOrderInput | SortOrder
    smtpFrom?: SortOrderInput | SortOrder
  }

  export type SettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    allowPublicUpload?: BoolFilter<"Settings"> | boolean
    allowRegistration?: BoolFilter<"Settings"> | boolean
    maxFileSize?: BigIntFilter<"Settings"> | bigint | number
    rateLimitWindow?: IntFilter<"Settings"> | number
    defaultCompression?: StringFilter<"Settings"> | string
    showNoCompression?: BoolFilter<"Settings"> | boolean
    showPrivateOption?: BoolFilter<"Settings"> | boolean
    forcePrivate?: BoolFilter<"Settings"> | boolean
    smtpHost?: StringNullableFilter<"Settings"> | string | null
    smtpPort?: IntNullableFilter<"Settings"> | number | null
    smtpUser?: StringNullableFilter<"Settings"> | string | null
    smtpPassword?: StringNullableFilter<"Settings"> | string | null
    smtpFrom?: StringNullableFilter<"Settings"> | string | null
  }, "id">

  export type SettingsOrderByWithAggregationInput = {
    id?: SortOrder
    allowPublicUpload?: SortOrder
    allowRegistration?: SortOrder
    maxFileSize?: SortOrder
    rateLimitWindow?: SortOrder
    defaultCompression?: SortOrder
    showNoCompression?: SortOrder
    showPrivateOption?: SortOrder
    forcePrivate?: SortOrder
    smtpHost?: SortOrderInput | SortOrder
    smtpPort?: SortOrderInput | SortOrder
    smtpUser?: SortOrderInput | SortOrder
    smtpPassword?: SortOrderInput | SortOrder
    smtpFrom?: SortOrderInput | SortOrder
    _count?: SettingsCountOrderByAggregateInput
    _avg?: SettingsAvgOrderByAggregateInput
    _max?: SettingsMaxOrderByAggregateInput
    _min?: SettingsMinOrderByAggregateInput
    _sum?: SettingsSumOrderByAggregateInput
  }

  export type SettingsScalarWhereWithAggregatesInput = {
    AND?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    OR?: SettingsScalarWhereWithAggregatesInput[]
    NOT?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Settings"> | string
    allowPublicUpload?: BoolWithAggregatesFilter<"Settings"> | boolean
    allowRegistration?: BoolWithAggregatesFilter<"Settings"> | boolean
    maxFileSize?: BigIntWithAggregatesFilter<"Settings"> | bigint | number
    rateLimitWindow?: IntWithAggregatesFilter<"Settings"> | number
    defaultCompression?: StringWithAggregatesFilter<"Settings"> | string
    showNoCompression?: BoolWithAggregatesFilter<"Settings"> | boolean
    showPrivateOption?: BoolWithAggregatesFilter<"Settings"> | boolean
    forcePrivate?: BoolWithAggregatesFilter<"Settings"> | boolean
    smtpHost?: StringNullableWithAggregatesFilter<"Settings"> | string | null
    smtpPort?: IntNullableWithAggregatesFilter<"Settings"> | number | null
    smtpUser?: StringNullableWithAggregatesFilter<"Settings"> | string | null
    smtpPassword?: StringNullableWithAggregatesFilter<"Settings"> | string | null
    smtpFrom?: StringNullableWithAggregatesFilter<"Settings"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: Date | string
    customMaxFileSize?: bigint | number | null
    customRateLimitWindow?: number | null
    media?: MediaCreateNestedManyWithoutUserInput
    ownedDrives?: DriveCreateNestedManyWithoutOwnerInput
    driveAccess?: DriveAccessCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: Date | string
    customMaxFileSize?: bigint | number | null
    customRateLimitWindow?: number | null
    media?: MediaUncheckedCreateNestedManyWithoutUserInput
    ownedDrives?: DriveUncheckedCreateNestedManyWithoutOwnerInput
    driveAccess?: DriveAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
    media?: MediaUpdateManyWithoutUserNestedInput
    ownedDrives?: DriveUpdateManyWithoutOwnerNestedInput
    driveAccess?: DriveAccessUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
    media?: MediaUncheckedUpdateManyWithoutUserNestedInput
    ownedDrives?: DriveUncheckedUpdateManyWithoutOwnerNestedInput
    driveAccess?: DriveAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: Date | string
    customMaxFileSize?: bigint | number | null
    customRateLimitWindow?: number | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MediaCreateInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip?: string | null
    isPrivate?: boolean
    transcodeStatus?: string
    transcodeError?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutMediaInput
    drive?: DriveCreateNestedOneWithoutFilesInput
  }

  export type MediaUncheckedCreateInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip?: string | null
    userId?: string | null
    isPrivate?: boolean
    transcodeStatus?: string
    transcodeError?: string | null
    createdAt?: Date | string
    driveId?: string | null
  }

  export type MediaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutMediaNestedInput
    drive?: DriveUpdateOneWithoutFilesNestedInput
  }

  export type MediaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driveId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MediaCreateManyInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip?: string | null
    userId?: string | null
    isPrivate?: boolean
    transcodeStatus?: string
    transcodeError?: string | null
    createdAt?: Date | string
    driveId?: string | null
  }

  export type MediaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driveId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DriveCreateInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedDrivesInput
    files?: MediaCreateNestedManyWithoutDriveInput
    access?: DriveAccessCreateNestedManyWithoutDriveInput
  }

  export type DriveUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    ownerId: string
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    files?: MediaUncheckedCreateNestedManyWithoutDriveInput
    access?: DriveAccessUncheckedCreateNestedManyWithoutDriveInput
  }

  export type DriveUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedDrivesNestedInput
    files?: MediaUpdateManyWithoutDriveNestedInput
    access?: DriveAccessUpdateManyWithoutDriveNestedInput
  }

  export type DriveUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: MediaUncheckedUpdateManyWithoutDriveNestedInput
    access?: DriveAccessUncheckedUpdateManyWithoutDriveNestedInput
  }

  export type DriveCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    ownerId: string
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriveUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriveUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriveAccessCreateInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    drive: DriveCreateNestedOneWithoutAccessInput
    user: UserCreateNestedOneWithoutDriveAccessInput
  }

  export type DriveAccessUncheckedCreateInput = {
    id?: string
    driveId: string
    userId: string
    role?: string
    createdAt?: Date | string
  }

  export type DriveAccessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    drive?: DriveUpdateOneRequiredWithoutAccessNestedInput
    user?: UserUpdateOneRequiredWithoutDriveAccessNestedInput
  }

  export type DriveAccessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    driveId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriveAccessCreateManyInput = {
    id?: string
    driveId: string
    userId: string
    role?: string
    createdAt?: Date | string
  }

  export type DriveAccessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriveAccessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    driveId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateInput = {
    id?: string
    allowPublicUpload?: boolean
    allowRegistration?: boolean
    maxFileSize?: bigint | number
    rateLimitWindow?: number
    defaultCompression?: string
    showNoCompression?: boolean
    showPrivateOption?: boolean
    forcePrivate?: boolean
    smtpHost?: string | null
    smtpPort?: number | null
    smtpUser?: string | null
    smtpPassword?: string | null
    smtpFrom?: string | null
  }

  export type SettingsUncheckedCreateInput = {
    id?: string
    allowPublicUpload?: boolean
    allowRegistration?: boolean
    maxFileSize?: bigint | number
    rateLimitWindow?: number
    defaultCompression?: string
    showNoCompression?: boolean
    showPrivateOption?: boolean
    forcePrivate?: boolean
    smtpHost?: string | null
    smtpPort?: number | null
    smtpUser?: string | null
    smtpPassword?: string | null
    smtpFrom?: string | null
  }

  export type SettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    allowPublicUpload?: BoolFieldUpdateOperationsInput | boolean
    allowRegistration?: BoolFieldUpdateOperationsInput | boolean
    maxFileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultCompression?: StringFieldUpdateOperationsInput | string
    showNoCompression?: BoolFieldUpdateOperationsInput | boolean
    showPrivateOption?: BoolFieldUpdateOperationsInput | boolean
    forcePrivate?: BoolFieldUpdateOperationsInput | boolean
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPassword?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    allowPublicUpload?: BoolFieldUpdateOperationsInput | boolean
    allowRegistration?: BoolFieldUpdateOperationsInput | boolean
    maxFileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultCompression?: StringFieldUpdateOperationsInput | string
    showNoCompression?: BoolFieldUpdateOperationsInput | boolean
    showPrivateOption?: BoolFieldUpdateOperationsInput | boolean
    forcePrivate?: BoolFieldUpdateOperationsInput | boolean
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPassword?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SettingsCreateManyInput = {
    id?: string
    allowPublicUpload?: boolean
    allowRegistration?: boolean
    maxFileSize?: bigint | number
    rateLimitWindow?: number
    defaultCompression?: string
    showNoCompression?: boolean
    showPrivateOption?: boolean
    forcePrivate?: boolean
    smtpHost?: string | null
    smtpPort?: number | null
    smtpUser?: string | null
    smtpPassword?: string | null
    smtpFrom?: string | null
  }

  export type SettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    allowPublicUpload?: BoolFieldUpdateOperationsInput | boolean
    allowRegistration?: BoolFieldUpdateOperationsInput | boolean
    maxFileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultCompression?: StringFieldUpdateOperationsInput | string
    showNoCompression?: BoolFieldUpdateOperationsInput | boolean
    showPrivateOption?: BoolFieldUpdateOperationsInput | boolean
    forcePrivate?: BoolFieldUpdateOperationsInput | boolean
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPassword?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    allowPublicUpload?: BoolFieldUpdateOperationsInput | boolean
    allowRegistration?: BoolFieldUpdateOperationsInput | boolean
    maxFileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultCompression?: StringFieldUpdateOperationsInput | string
    showNoCompression?: BoolFieldUpdateOperationsInput | boolean
    showPrivateOption?: BoolFieldUpdateOperationsInput | boolean
    forcePrivate?: BoolFieldUpdateOperationsInput | boolean
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPassword?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MediaListRelationFilter = {
    every?: MediaWhereInput
    some?: MediaWhereInput
    none?: MediaWhereInput
  }

  export type DriveListRelationFilter = {
    every?: DriveWhereInput
    some?: DriveWhereInput
    none?: DriveWhereInput
  }

  export type DriveAccessListRelationFilter = {
    every?: DriveAccessWhereInput
    some?: DriveAccessWhereInput
    none?: DriveAccessWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MediaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DriveOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DriveAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    customMaxFileSize?: SortOrder
    customRateLimitWindow?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    customMaxFileSize?: SortOrder
    customRateLimitWindow?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    customMaxFileSize?: SortOrder
    customRateLimitWindow?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    customMaxFileSize?: SortOrder
    customRateLimitWindow?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    customMaxFileSize?: SortOrder
    customRateLimitWindow?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DriveNullableScalarRelationFilter = {
    is?: DriveWhereInput | null
    isNot?: DriveWhereInput | null
  }

  export type MediaCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    ip?: SortOrder
    userId?: SortOrder
    isPrivate?: SortOrder
    transcodeStatus?: SortOrder
    transcodeError?: SortOrder
    createdAt?: SortOrder
    driveId?: SortOrder
  }

  export type MediaAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type MediaMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    ip?: SortOrder
    userId?: SortOrder
    isPrivate?: SortOrder
    transcodeStatus?: SortOrder
    transcodeError?: SortOrder
    createdAt?: SortOrder
    driveId?: SortOrder
  }

  export type MediaMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    ip?: SortOrder
    userId?: SortOrder
    isPrivate?: SortOrder
    transcodeStatus?: SortOrder
    transcodeError?: SortOrder
    createdAt?: SortOrder
    driveId?: SortOrder
  }

  export type MediaSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DriveCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    isPublic?: SortOrder
    publicRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriveMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    isPublic?: SortOrder
    publicRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriveMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    isPublic?: SortOrder
    publicRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriveScalarRelationFilter = {
    is?: DriveWhereInput
    isNot?: DriveWhereInput
  }

  export type DriveAccessDriveIdUserIdCompoundUniqueInput = {
    driveId: string
    userId: string
  }

  export type DriveAccessCountOrderByAggregateInput = {
    id?: SortOrder
    driveId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type DriveAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    driveId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type DriveAccessMinOrderByAggregateInput = {
    id?: SortOrder
    driveId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type SettingsCountOrderByAggregateInput = {
    id?: SortOrder
    allowPublicUpload?: SortOrder
    allowRegistration?: SortOrder
    maxFileSize?: SortOrder
    rateLimitWindow?: SortOrder
    defaultCompression?: SortOrder
    showNoCompression?: SortOrder
    showPrivateOption?: SortOrder
    forcePrivate?: SortOrder
    smtpHost?: SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrder
    smtpPassword?: SortOrder
    smtpFrom?: SortOrder
  }

  export type SettingsAvgOrderByAggregateInput = {
    maxFileSize?: SortOrder
    rateLimitWindow?: SortOrder
    smtpPort?: SortOrder
  }

  export type SettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    allowPublicUpload?: SortOrder
    allowRegistration?: SortOrder
    maxFileSize?: SortOrder
    rateLimitWindow?: SortOrder
    defaultCompression?: SortOrder
    showNoCompression?: SortOrder
    showPrivateOption?: SortOrder
    forcePrivate?: SortOrder
    smtpHost?: SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrder
    smtpPassword?: SortOrder
    smtpFrom?: SortOrder
  }

  export type SettingsMinOrderByAggregateInput = {
    id?: SortOrder
    allowPublicUpload?: SortOrder
    allowRegistration?: SortOrder
    maxFileSize?: SortOrder
    rateLimitWindow?: SortOrder
    defaultCompression?: SortOrder
    showNoCompression?: SortOrder
    showPrivateOption?: SortOrder
    forcePrivate?: SortOrder
    smtpHost?: SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrder
    smtpPassword?: SortOrder
    smtpFrom?: SortOrder
  }

  export type SettingsSumOrderByAggregateInput = {
    maxFileSize?: SortOrder
    rateLimitWindow?: SortOrder
    smtpPort?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type MediaCreateNestedManyWithoutUserInput = {
    create?: XOR<MediaCreateWithoutUserInput, MediaUncheckedCreateWithoutUserInput> | MediaCreateWithoutUserInput[] | MediaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutUserInput | MediaCreateOrConnectWithoutUserInput[]
    createMany?: MediaCreateManyUserInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type DriveCreateNestedManyWithoutOwnerInput = {
    create?: XOR<DriveCreateWithoutOwnerInput, DriveUncheckedCreateWithoutOwnerInput> | DriveCreateWithoutOwnerInput[] | DriveUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DriveCreateOrConnectWithoutOwnerInput | DriveCreateOrConnectWithoutOwnerInput[]
    createMany?: DriveCreateManyOwnerInputEnvelope
    connect?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
  }

  export type DriveAccessCreateNestedManyWithoutUserInput = {
    create?: XOR<DriveAccessCreateWithoutUserInput, DriveAccessUncheckedCreateWithoutUserInput> | DriveAccessCreateWithoutUserInput[] | DriveAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DriveAccessCreateOrConnectWithoutUserInput | DriveAccessCreateOrConnectWithoutUserInput[]
    createMany?: DriveAccessCreateManyUserInputEnvelope
    connect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
  }

  export type MediaUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MediaCreateWithoutUserInput, MediaUncheckedCreateWithoutUserInput> | MediaCreateWithoutUserInput[] | MediaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutUserInput | MediaCreateOrConnectWithoutUserInput[]
    createMany?: MediaCreateManyUserInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type DriveUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<DriveCreateWithoutOwnerInput, DriveUncheckedCreateWithoutOwnerInput> | DriveCreateWithoutOwnerInput[] | DriveUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DriveCreateOrConnectWithoutOwnerInput | DriveCreateOrConnectWithoutOwnerInput[]
    createMany?: DriveCreateManyOwnerInputEnvelope
    connect?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
  }

  export type DriveAccessUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DriveAccessCreateWithoutUserInput, DriveAccessUncheckedCreateWithoutUserInput> | DriveAccessCreateWithoutUserInput[] | DriveAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DriveAccessCreateOrConnectWithoutUserInput | DriveAccessCreateOrConnectWithoutUserInput[]
    createMany?: DriveAccessCreateManyUserInputEnvelope
    connect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MediaUpdateManyWithoutUserNestedInput = {
    create?: XOR<MediaCreateWithoutUserInput, MediaUncheckedCreateWithoutUserInput> | MediaCreateWithoutUserInput[] | MediaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutUserInput | MediaCreateOrConnectWithoutUserInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutUserInput | MediaUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MediaCreateManyUserInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutUserInput | MediaUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutUserInput | MediaUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type DriveUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<DriveCreateWithoutOwnerInput, DriveUncheckedCreateWithoutOwnerInput> | DriveCreateWithoutOwnerInput[] | DriveUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DriveCreateOrConnectWithoutOwnerInput | DriveCreateOrConnectWithoutOwnerInput[]
    upsert?: DriveUpsertWithWhereUniqueWithoutOwnerInput | DriveUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: DriveCreateManyOwnerInputEnvelope
    set?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
    disconnect?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
    delete?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
    connect?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
    update?: DriveUpdateWithWhereUniqueWithoutOwnerInput | DriveUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: DriveUpdateManyWithWhereWithoutOwnerInput | DriveUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: DriveScalarWhereInput | DriveScalarWhereInput[]
  }

  export type DriveAccessUpdateManyWithoutUserNestedInput = {
    create?: XOR<DriveAccessCreateWithoutUserInput, DriveAccessUncheckedCreateWithoutUserInput> | DriveAccessCreateWithoutUserInput[] | DriveAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DriveAccessCreateOrConnectWithoutUserInput | DriveAccessCreateOrConnectWithoutUserInput[]
    upsert?: DriveAccessUpsertWithWhereUniqueWithoutUserInput | DriveAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DriveAccessCreateManyUserInputEnvelope
    set?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    disconnect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    delete?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    connect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    update?: DriveAccessUpdateWithWhereUniqueWithoutUserInput | DriveAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DriveAccessUpdateManyWithWhereWithoutUserInput | DriveAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DriveAccessScalarWhereInput | DriveAccessScalarWhereInput[]
  }

  export type MediaUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MediaCreateWithoutUserInput, MediaUncheckedCreateWithoutUserInput> | MediaCreateWithoutUserInput[] | MediaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutUserInput | MediaCreateOrConnectWithoutUserInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutUserInput | MediaUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MediaCreateManyUserInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutUserInput | MediaUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutUserInput | MediaUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type DriveUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<DriveCreateWithoutOwnerInput, DriveUncheckedCreateWithoutOwnerInput> | DriveCreateWithoutOwnerInput[] | DriveUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DriveCreateOrConnectWithoutOwnerInput | DriveCreateOrConnectWithoutOwnerInput[]
    upsert?: DriveUpsertWithWhereUniqueWithoutOwnerInput | DriveUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: DriveCreateManyOwnerInputEnvelope
    set?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
    disconnect?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
    delete?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
    connect?: DriveWhereUniqueInput | DriveWhereUniqueInput[]
    update?: DriveUpdateWithWhereUniqueWithoutOwnerInput | DriveUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: DriveUpdateManyWithWhereWithoutOwnerInput | DriveUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: DriveScalarWhereInput | DriveScalarWhereInput[]
  }

  export type DriveAccessUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DriveAccessCreateWithoutUserInput, DriveAccessUncheckedCreateWithoutUserInput> | DriveAccessCreateWithoutUserInput[] | DriveAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DriveAccessCreateOrConnectWithoutUserInput | DriveAccessCreateOrConnectWithoutUserInput[]
    upsert?: DriveAccessUpsertWithWhereUniqueWithoutUserInput | DriveAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DriveAccessCreateManyUserInputEnvelope
    set?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    disconnect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    delete?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    connect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    update?: DriveAccessUpdateWithWhereUniqueWithoutUserInput | DriveAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DriveAccessUpdateManyWithWhereWithoutUserInput | DriveAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DriveAccessScalarWhereInput | DriveAccessScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMediaInput = {
    create?: XOR<UserCreateWithoutMediaInput, UserUncheckedCreateWithoutMediaInput>
    connectOrCreate?: UserCreateOrConnectWithoutMediaInput
    connect?: UserWhereUniqueInput
  }

  export type DriveCreateNestedOneWithoutFilesInput = {
    create?: XOR<DriveCreateWithoutFilesInput, DriveUncheckedCreateWithoutFilesInput>
    connectOrCreate?: DriveCreateOrConnectWithoutFilesInput
    connect?: DriveWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneWithoutMediaNestedInput = {
    create?: XOR<UserCreateWithoutMediaInput, UserUncheckedCreateWithoutMediaInput>
    connectOrCreate?: UserCreateOrConnectWithoutMediaInput
    upsert?: UserUpsertWithoutMediaInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMediaInput, UserUpdateWithoutMediaInput>, UserUncheckedUpdateWithoutMediaInput>
  }

  export type DriveUpdateOneWithoutFilesNestedInput = {
    create?: XOR<DriveCreateWithoutFilesInput, DriveUncheckedCreateWithoutFilesInput>
    connectOrCreate?: DriveCreateOrConnectWithoutFilesInput
    upsert?: DriveUpsertWithoutFilesInput
    disconnect?: DriveWhereInput | boolean
    delete?: DriveWhereInput | boolean
    connect?: DriveWhereUniqueInput
    update?: XOR<XOR<DriveUpdateToOneWithWhereWithoutFilesInput, DriveUpdateWithoutFilesInput>, DriveUncheckedUpdateWithoutFilesInput>
  }

  export type UserCreateNestedOneWithoutOwnedDrivesInput = {
    create?: XOR<UserCreateWithoutOwnedDrivesInput, UserUncheckedCreateWithoutOwnedDrivesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedDrivesInput
    connect?: UserWhereUniqueInput
  }

  export type MediaCreateNestedManyWithoutDriveInput = {
    create?: XOR<MediaCreateWithoutDriveInput, MediaUncheckedCreateWithoutDriveInput> | MediaCreateWithoutDriveInput[] | MediaUncheckedCreateWithoutDriveInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutDriveInput | MediaCreateOrConnectWithoutDriveInput[]
    createMany?: MediaCreateManyDriveInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type DriveAccessCreateNestedManyWithoutDriveInput = {
    create?: XOR<DriveAccessCreateWithoutDriveInput, DriveAccessUncheckedCreateWithoutDriveInput> | DriveAccessCreateWithoutDriveInput[] | DriveAccessUncheckedCreateWithoutDriveInput[]
    connectOrCreate?: DriveAccessCreateOrConnectWithoutDriveInput | DriveAccessCreateOrConnectWithoutDriveInput[]
    createMany?: DriveAccessCreateManyDriveInputEnvelope
    connect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
  }

  export type MediaUncheckedCreateNestedManyWithoutDriveInput = {
    create?: XOR<MediaCreateWithoutDriveInput, MediaUncheckedCreateWithoutDriveInput> | MediaCreateWithoutDriveInput[] | MediaUncheckedCreateWithoutDriveInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutDriveInput | MediaCreateOrConnectWithoutDriveInput[]
    createMany?: MediaCreateManyDriveInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type DriveAccessUncheckedCreateNestedManyWithoutDriveInput = {
    create?: XOR<DriveAccessCreateWithoutDriveInput, DriveAccessUncheckedCreateWithoutDriveInput> | DriveAccessCreateWithoutDriveInput[] | DriveAccessUncheckedCreateWithoutDriveInput[]
    connectOrCreate?: DriveAccessCreateOrConnectWithoutDriveInput | DriveAccessCreateOrConnectWithoutDriveInput[]
    createMany?: DriveAccessCreateManyDriveInputEnvelope
    connect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOwnedDrivesNestedInput = {
    create?: XOR<UserCreateWithoutOwnedDrivesInput, UserUncheckedCreateWithoutOwnedDrivesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedDrivesInput
    upsert?: UserUpsertWithoutOwnedDrivesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedDrivesInput, UserUpdateWithoutOwnedDrivesInput>, UserUncheckedUpdateWithoutOwnedDrivesInput>
  }

  export type MediaUpdateManyWithoutDriveNestedInput = {
    create?: XOR<MediaCreateWithoutDriveInput, MediaUncheckedCreateWithoutDriveInput> | MediaCreateWithoutDriveInput[] | MediaUncheckedCreateWithoutDriveInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutDriveInput | MediaCreateOrConnectWithoutDriveInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutDriveInput | MediaUpsertWithWhereUniqueWithoutDriveInput[]
    createMany?: MediaCreateManyDriveInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutDriveInput | MediaUpdateWithWhereUniqueWithoutDriveInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutDriveInput | MediaUpdateManyWithWhereWithoutDriveInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type DriveAccessUpdateManyWithoutDriveNestedInput = {
    create?: XOR<DriveAccessCreateWithoutDriveInput, DriveAccessUncheckedCreateWithoutDriveInput> | DriveAccessCreateWithoutDriveInput[] | DriveAccessUncheckedCreateWithoutDriveInput[]
    connectOrCreate?: DriveAccessCreateOrConnectWithoutDriveInput | DriveAccessCreateOrConnectWithoutDriveInput[]
    upsert?: DriveAccessUpsertWithWhereUniqueWithoutDriveInput | DriveAccessUpsertWithWhereUniqueWithoutDriveInput[]
    createMany?: DriveAccessCreateManyDriveInputEnvelope
    set?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    disconnect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    delete?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    connect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    update?: DriveAccessUpdateWithWhereUniqueWithoutDriveInput | DriveAccessUpdateWithWhereUniqueWithoutDriveInput[]
    updateMany?: DriveAccessUpdateManyWithWhereWithoutDriveInput | DriveAccessUpdateManyWithWhereWithoutDriveInput[]
    deleteMany?: DriveAccessScalarWhereInput | DriveAccessScalarWhereInput[]
  }

  export type MediaUncheckedUpdateManyWithoutDriveNestedInput = {
    create?: XOR<MediaCreateWithoutDriveInput, MediaUncheckedCreateWithoutDriveInput> | MediaCreateWithoutDriveInput[] | MediaUncheckedCreateWithoutDriveInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutDriveInput | MediaCreateOrConnectWithoutDriveInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutDriveInput | MediaUpsertWithWhereUniqueWithoutDriveInput[]
    createMany?: MediaCreateManyDriveInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutDriveInput | MediaUpdateWithWhereUniqueWithoutDriveInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutDriveInput | MediaUpdateManyWithWhereWithoutDriveInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type DriveAccessUncheckedUpdateManyWithoutDriveNestedInput = {
    create?: XOR<DriveAccessCreateWithoutDriveInput, DriveAccessUncheckedCreateWithoutDriveInput> | DriveAccessCreateWithoutDriveInput[] | DriveAccessUncheckedCreateWithoutDriveInput[]
    connectOrCreate?: DriveAccessCreateOrConnectWithoutDriveInput | DriveAccessCreateOrConnectWithoutDriveInput[]
    upsert?: DriveAccessUpsertWithWhereUniqueWithoutDriveInput | DriveAccessUpsertWithWhereUniqueWithoutDriveInput[]
    createMany?: DriveAccessCreateManyDriveInputEnvelope
    set?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    disconnect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    delete?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    connect?: DriveAccessWhereUniqueInput | DriveAccessWhereUniqueInput[]
    update?: DriveAccessUpdateWithWhereUniqueWithoutDriveInput | DriveAccessUpdateWithWhereUniqueWithoutDriveInput[]
    updateMany?: DriveAccessUpdateManyWithWhereWithoutDriveInput | DriveAccessUpdateManyWithWhereWithoutDriveInput[]
    deleteMany?: DriveAccessScalarWhereInput | DriveAccessScalarWhereInput[]
  }

  export type DriveCreateNestedOneWithoutAccessInput = {
    create?: XOR<DriveCreateWithoutAccessInput, DriveUncheckedCreateWithoutAccessInput>
    connectOrCreate?: DriveCreateOrConnectWithoutAccessInput
    connect?: DriveWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDriveAccessInput = {
    create?: XOR<UserCreateWithoutDriveAccessInput, UserUncheckedCreateWithoutDriveAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutDriveAccessInput
    connect?: UserWhereUniqueInput
  }

  export type DriveUpdateOneRequiredWithoutAccessNestedInput = {
    create?: XOR<DriveCreateWithoutAccessInput, DriveUncheckedCreateWithoutAccessInput>
    connectOrCreate?: DriveCreateOrConnectWithoutAccessInput
    upsert?: DriveUpsertWithoutAccessInput
    connect?: DriveWhereUniqueInput
    update?: XOR<XOR<DriveUpdateToOneWithWhereWithoutAccessInput, DriveUpdateWithoutAccessInput>, DriveUncheckedUpdateWithoutAccessInput>
  }

  export type UserUpdateOneRequiredWithoutDriveAccessNestedInput = {
    create?: XOR<UserCreateWithoutDriveAccessInput, UserUncheckedCreateWithoutDriveAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutDriveAccessInput
    upsert?: UserUpsertWithoutDriveAccessInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDriveAccessInput, UserUpdateWithoutDriveAccessInput>, UserUncheckedUpdateWithoutDriveAccessInput>
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type MediaCreateWithoutUserInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip?: string | null
    isPrivate?: boolean
    transcodeStatus?: string
    transcodeError?: string | null
    createdAt?: Date | string
    drive?: DriveCreateNestedOneWithoutFilesInput
  }

  export type MediaUncheckedCreateWithoutUserInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip?: string | null
    isPrivate?: boolean
    transcodeStatus?: string
    transcodeError?: string | null
    createdAt?: Date | string
    driveId?: string | null
  }

  export type MediaCreateOrConnectWithoutUserInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutUserInput, MediaUncheckedCreateWithoutUserInput>
  }

  export type MediaCreateManyUserInputEnvelope = {
    data: MediaCreateManyUserInput | MediaCreateManyUserInput[]
  }

  export type DriveCreateWithoutOwnerInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    files?: MediaCreateNestedManyWithoutDriveInput
    access?: DriveAccessCreateNestedManyWithoutDriveInput
  }

  export type DriveUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    files?: MediaUncheckedCreateNestedManyWithoutDriveInput
    access?: DriveAccessUncheckedCreateNestedManyWithoutDriveInput
  }

  export type DriveCreateOrConnectWithoutOwnerInput = {
    where: DriveWhereUniqueInput
    create: XOR<DriveCreateWithoutOwnerInput, DriveUncheckedCreateWithoutOwnerInput>
  }

  export type DriveCreateManyOwnerInputEnvelope = {
    data: DriveCreateManyOwnerInput | DriveCreateManyOwnerInput[]
  }

  export type DriveAccessCreateWithoutUserInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    drive: DriveCreateNestedOneWithoutAccessInput
  }

  export type DriveAccessUncheckedCreateWithoutUserInput = {
    id?: string
    driveId: string
    role?: string
    createdAt?: Date | string
  }

  export type DriveAccessCreateOrConnectWithoutUserInput = {
    where: DriveAccessWhereUniqueInput
    create: XOR<DriveAccessCreateWithoutUserInput, DriveAccessUncheckedCreateWithoutUserInput>
  }

  export type DriveAccessCreateManyUserInputEnvelope = {
    data: DriveAccessCreateManyUserInput | DriveAccessCreateManyUserInput[]
  }

  export type MediaUpsertWithWhereUniqueWithoutUserInput = {
    where: MediaWhereUniqueInput
    update: XOR<MediaUpdateWithoutUserInput, MediaUncheckedUpdateWithoutUserInput>
    create: XOR<MediaCreateWithoutUserInput, MediaUncheckedCreateWithoutUserInput>
  }

  export type MediaUpdateWithWhereUniqueWithoutUserInput = {
    where: MediaWhereUniqueInput
    data: XOR<MediaUpdateWithoutUserInput, MediaUncheckedUpdateWithoutUserInput>
  }

  export type MediaUpdateManyWithWhereWithoutUserInput = {
    where: MediaScalarWhereInput
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyWithoutUserInput>
  }

  export type MediaScalarWhereInput = {
    AND?: MediaScalarWhereInput | MediaScalarWhereInput[]
    OR?: MediaScalarWhereInput[]
    NOT?: MediaScalarWhereInput | MediaScalarWhereInput[]
    id?: StringFilter<"Media"> | string
    filename?: StringFilter<"Media"> | string
    originalName?: StringFilter<"Media"> | string
    mimeType?: StringFilter<"Media"> | string
    size?: IntFilter<"Media"> | number
    ip?: StringNullableFilter<"Media"> | string | null
    userId?: StringNullableFilter<"Media"> | string | null
    isPrivate?: BoolFilter<"Media"> | boolean
    transcodeStatus?: StringFilter<"Media"> | string
    transcodeError?: StringNullableFilter<"Media"> | string | null
    createdAt?: DateTimeFilter<"Media"> | Date | string
    driveId?: StringNullableFilter<"Media"> | string | null
  }

  export type DriveUpsertWithWhereUniqueWithoutOwnerInput = {
    where: DriveWhereUniqueInput
    update: XOR<DriveUpdateWithoutOwnerInput, DriveUncheckedUpdateWithoutOwnerInput>
    create: XOR<DriveCreateWithoutOwnerInput, DriveUncheckedCreateWithoutOwnerInput>
  }

  export type DriveUpdateWithWhereUniqueWithoutOwnerInput = {
    where: DriveWhereUniqueInput
    data: XOR<DriveUpdateWithoutOwnerInput, DriveUncheckedUpdateWithoutOwnerInput>
  }

  export type DriveUpdateManyWithWhereWithoutOwnerInput = {
    where: DriveScalarWhereInput
    data: XOR<DriveUpdateManyMutationInput, DriveUncheckedUpdateManyWithoutOwnerInput>
  }

  export type DriveScalarWhereInput = {
    AND?: DriveScalarWhereInput | DriveScalarWhereInput[]
    OR?: DriveScalarWhereInput[]
    NOT?: DriveScalarWhereInput | DriveScalarWhereInput[]
    id?: StringFilter<"Drive"> | string
    name?: StringFilter<"Drive"> | string
    description?: StringNullableFilter<"Drive"> | string | null
    ownerId?: StringFilter<"Drive"> | string
    isPublic?: BoolFilter<"Drive"> | boolean
    publicRole?: StringFilter<"Drive"> | string
    createdAt?: DateTimeFilter<"Drive"> | Date | string
    updatedAt?: DateTimeFilter<"Drive"> | Date | string
  }

  export type DriveAccessUpsertWithWhereUniqueWithoutUserInput = {
    where: DriveAccessWhereUniqueInput
    update: XOR<DriveAccessUpdateWithoutUserInput, DriveAccessUncheckedUpdateWithoutUserInput>
    create: XOR<DriveAccessCreateWithoutUserInput, DriveAccessUncheckedCreateWithoutUserInput>
  }

  export type DriveAccessUpdateWithWhereUniqueWithoutUserInput = {
    where: DriveAccessWhereUniqueInput
    data: XOR<DriveAccessUpdateWithoutUserInput, DriveAccessUncheckedUpdateWithoutUserInput>
  }

  export type DriveAccessUpdateManyWithWhereWithoutUserInput = {
    where: DriveAccessScalarWhereInput
    data: XOR<DriveAccessUpdateManyMutationInput, DriveAccessUncheckedUpdateManyWithoutUserInput>
  }

  export type DriveAccessScalarWhereInput = {
    AND?: DriveAccessScalarWhereInput | DriveAccessScalarWhereInput[]
    OR?: DriveAccessScalarWhereInput[]
    NOT?: DriveAccessScalarWhereInput | DriveAccessScalarWhereInput[]
    id?: StringFilter<"DriveAccess"> | string
    driveId?: StringFilter<"DriveAccess"> | string
    userId?: StringFilter<"DriveAccess"> | string
    role?: StringFilter<"DriveAccess"> | string
    createdAt?: DateTimeFilter<"DriveAccess"> | Date | string
  }

  export type UserCreateWithoutMediaInput = {
    id?: string
    username: string
    password: string
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: Date | string
    customMaxFileSize?: bigint | number | null
    customRateLimitWindow?: number | null
    ownedDrives?: DriveCreateNestedManyWithoutOwnerInput
    driveAccess?: DriveAccessCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMediaInput = {
    id?: string
    username: string
    password: string
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: Date | string
    customMaxFileSize?: bigint | number | null
    customRateLimitWindow?: number | null
    ownedDrives?: DriveUncheckedCreateNestedManyWithoutOwnerInput
    driveAccess?: DriveAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMediaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMediaInput, UserUncheckedCreateWithoutMediaInput>
  }

  export type DriveCreateWithoutFilesInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedDrivesInput
    access?: DriveAccessCreateNestedManyWithoutDriveInput
  }

  export type DriveUncheckedCreateWithoutFilesInput = {
    id?: string
    name: string
    description?: string | null
    ownerId: string
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    access?: DriveAccessUncheckedCreateNestedManyWithoutDriveInput
  }

  export type DriveCreateOrConnectWithoutFilesInput = {
    where: DriveWhereUniqueInput
    create: XOR<DriveCreateWithoutFilesInput, DriveUncheckedCreateWithoutFilesInput>
  }

  export type UserUpsertWithoutMediaInput = {
    update: XOR<UserUpdateWithoutMediaInput, UserUncheckedUpdateWithoutMediaInput>
    create: XOR<UserCreateWithoutMediaInput, UserUncheckedCreateWithoutMediaInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMediaInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMediaInput, UserUncheckedUpdateWithoutMediaInput>
  }

  export type UserUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
    ownedDrives?: DriveUpdateManyWithoutOwnerNestedInput
    driveAccess?: DriveAccessUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
    ownedDrives?: DriveUncheckedUpdateManyWithoutOwnerNestedInput
    driveAccess?: DriveAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DriveUpsertWithoutFilesInput = {
    update: XOR<DriveUpdateWithoutFilesInput, DriveUncheckedUpdateWithoutFilesInput>
    create: XOR<DriveCreateWithoutFilesInput, DriveUncheckedCreateWithoutFilesInput>
    where?: DriveWhereInput
  }

  export type DriveUpdateToOneWithWhereWithoutFilesInput = {
    where?: DriveWhereInput
    data: XOR<DriveUpdateWithoutFilesInput, DriveUncheckedUpdateWithoutFilesInput>
  }

  export type DriveUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedDrivesNestedInput
    access?: DriveAccessUpdateManyWithoutDriveNestedInput
  }

  export type DriveUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    access?: DriveAccessUncheckedUpdateManyWithoutDriveNestedInput
  }

  export type UserCreateWithoutOwnedDrivesInput = {
    id?: string
    username: string
    password: string
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: Date | string
    customMaxFileSize?: bigint | number | null
    customRateLimitWindow?: number | null
    media?: MediaCreateNestedManyWithoutUserInput
    driveAccess?: DriveAccessCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwnedDrivesInput = {
    id?: string
    username: string
    password: string
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: Date | string
    customMaxFileSize?: bigint | number | null
    customRateLimitWindow?: number | null
    media?: MediaUncheckedCreateNestedManyWithoutUserInput
    driveAccess?: DriveAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwnedDrivesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedDrivesInput, UserUncheckedCreateWithoutOwnedDrivesInput>
  }

  export type MediaCreateWithoutDriveInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip?: string | null
    isPrivate?: boolean
    transcodeStatus?: string
    transcodeError?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutMediaInput
  }

  export type MediaUncheckedCreateWithoutDriveInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip?: string | null
    userId?: string | null
    isPrivate?: boolean
    transcodeStatus?: string
    transcodeError?: string | null
    createdAt?: Date | string
  }

  export type MediaCreateOrConnectWithoutDriveInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutDriveInput, MediaUncheckedCreateWithoutDriveInput>
  }

  export type MediaCreateManyDriveInputEnvelope = {
    data: MediaCreateManyDriveInput | MediaCreateManyDriveInput[]
  }

  export type DriveAccessCreateWithoutDriveInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutDriveAccessInput
  }

  export type DriveAccessUncheckedCreateWithoutDriveInput = {
    id?: string
    userId: string
    role?: string
    createdAt?: Date | string
  }

  export type DriveAccessCreateOrConnectWithoutDriveInput = {
    where: DriveAccessWhereUniqueInput
    create: XOR<DriveAccessCreateWithoutDriveInput, DriveAccessUncheckedCreateWithoutDriveInput>
  }

  export type DriveAccessCreateManyDriveInputEnvelope = {
    data: DriveAccessCreateManyDriveInput | DriveAccessCreateManyDriveInput[]
  }

  export type UserUpsertWithoutOwnedDrivesInput = {
    update: XOR<UserUpdateWithoutOwnedDrivesInput, UserUncheckedUpdateWithoutOwnedDrivesInput>
    create: XOR<UserCreateWithoutOwnedDrivesInput, UserUncheckedCreateWithoutOwnedDrivesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedDrivesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedDrivesInput, UserUncheckedUpdateWithoutOwnedDrivesInput>
  }

  export type UserUpdateWithoutOwnedDrivesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
    media?: MediaUpdateManyWithoutUserNestedInput
    driveAccess?: DriveAccessUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedDrivesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
    media?: MediaUncheckedUpdateManyWithoutUserNestedInput
    driveAccess?: DriveAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MediaUpsertWithWhereUniqueWithoutDriveInput = {
    where: MediaWhereUniqueInput
    update: XOR<MediaUpdateWithoutDriveInput, MediaUncheckedUpdateWithoutDriveInput>
    create: XOR<MediaCreateWithoutDriveInput, MediaUncheckedCreateWithoutDriveInput>
  }

  export type MediaUpdateWithWhereUniqueWithoutDriveInput = {
    where: MediaWhereUniqueInput
    data: XOR<MediaUpdateWithoutDriveInput, MediaUncheckedUpdateWithoutDriveInput>
  }

  export type MediaUpdateManyWithWhereWithoutDriveInput = {
    where: MediaScalarWhereInput
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyWithoutDriveInput>
  }

  export type DriveAccessUpsertWithWhereUniqueWithoutDriveInput = {
    where: DriveAccessWhereUniqueInput
    update: XOR<DriveAccessUpdateWithoutDriveInput, DriveAccessUncheckedUpdateWithoutDriveInput>
    create: XOR<DriveAccessCreateWithoutDriveInput, DriveAccessUncheckedCreateWithoutDriveInput>
  }

  export type DriveAccessUpdateWithWhereUniqueWithoutDriveInput = {
    where: DriveAccessWhereUniqueInput
    data: XOR<DriveAccessUpdateWithoutDriveInput, DriveAccessUncheckedUpdateWithoutDriveInput>
  }

  export type DriveAccessUpdateManyWithWhereWithoutDriveInput = {
    where: DriveAccessScalarWhereInput
    data: XOR<DriveAccessUpdateManyMutationInput, DriveAccessUncheckedUpdateManyWithoutDriveInput>
  }

  export type DriveCreateWithoutAccessInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedDrivesInput
    files?: MediaCreateNestedManyWithoutDriveInput
  }

  export type DriveUncheckedCreateWithoutAccessInput = {
    id?: string
    name: string
    description?: string | null
    ownerId: string
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    files?: MediaUncheckedCreateNestedManyWithoutDriveInput
  }

  export type DriveCreateOrConnectWithoutAccessInput = {
    where: DriveWhereUniqueInput
    create: XOR<DriveCreateWithoutAccessInput, DriveUncheckedCreateWithoutAccessInput>
  }

  export type UserCreateWithoutDriveAccessInput = {
    id?: string
    username: string
    password: string
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: Date | string
    customMaxFileSize?: bigint | number | null
    customRateLimitWindow?: number | null
    media?: MediaCreateNestedManyWithoutUserInput
    ownedDrives?: DriveCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutDriveAccessInput = {
    id?: string
    username: string
    password: string
    isAdmin?: boolean
    mustChangePassword?: boolean
    createdAt?: Date | string
    customMaxFileSize?: bigint | number | null
    customRateLimitWindow?: number | null
    media?: MediaUncheckedCreateNestedManyWithoutUserInput
    ownedDrives?: DriveUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutDriveAccessInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDriveAccessInput, UserUncheckedCreateWithoutDriveAccessInput>
  }

  export type DriveUpsertWithoutAccessInput = {
    update: XOR<DriveUpdateWithoutAccessInput, DriveUncheckedUpdateWithoutAccessInput>
    create: XOR<DriveCreateWithoutAccessInput, DriveUncheckedCreateWithoutAccessInput>
    where?: DriveWhereInput
  }

  export type DriveUpdateToOneWithWhereWithoutAccessInput = {
    where?: DriveWhereInput
    data: XOR<DriveUpdateWithoutAccessInput, DriveUncheckedUpdateWithoutAccessInput>
  }

  export type DriveUpdateWithoutAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedDrivesNestedInput
    files?: MediaUpdateManyWithoutDriveNestedInput
  }

  export type DriveUncheckedUpdateWithoutAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: MediaUncheckedUpdateManyWithoutDriveNestedInput
  }

  export type UserUpsertWithoutDriveAccessInput = {
    update: XOR<UserUpdateWithoutDriveAccessInput, UserUncheckedUpdateWithoutDriveAccessInput>
    create: XOR<UserCreateWithoutDriveAccessInput, UserUncheckedCreateWithoutDriveAccessInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDriveAccessInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDriveAccessInput, UserUncheckedUpdateWithoutDriveAccessInput>
  }

  export type UserUpdateWithoutDriveAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
    media?: MediaUpdateManyWithoutUserNestedInput
    ownedDrives?: DriveUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutDriveAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customMaxFileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    customRateLimitWindow?: NullableIntFieldUpdateOperationsInput | number | null
    media?: MediaUncheckedUpdateManyWithoutUserNestedInput
    ownedDrives?: DriveUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type MediaCreateManyUserInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip?: string | null
    isPrivate?: boolean
    transcodeStatus?: string
    transcodeError?: string | null
    createdAt?: Date | string
    driveId?: string | null
  }

  export type DriveCreateManyOwnerInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    publicRole?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriveAccessCreateManyUserInput = {
    id?: string
    driveId: string
    role?: string
    createdAt?: Date | string
  }

  export type MediaUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    drive?: DriveUpdateOneWithoutFilesNestedInput
  }

  export type MediaUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driveId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MediaUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driveId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DriveUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: MediaUpdateManyWithoutDriveNestedInput
    access?: DriveAccessUpdateManyWithoutDriveNestedInput
  }

  export type DriveUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: MediaUncheckedUpdateManyWithoutDriveNestedInput
    access?: DriveAccessUncheckedUpdateManyWithoutDriveNestedInput
  }

  export type DriveUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    publicRole?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriveAccessUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    drive?: DriveUpdateOneRequiredWithoutAccessNestedInput
  }

  export type DriveAccessUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    driveId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriveAccessUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    driveId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaCreateManyDriveInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    ip?: string | null
    userId?: string | null
    isPrivate?: boolean
    transcodeStatus?: string
    transcodeError?: string | null
    createdAt?: Date | string
  }

  export type DriveAccessCreateManyDriveInput = {
    id?: string
    userId: string
    role?: string
    createdAt?: Date | string
  }

  export type MediaUpdateWithoutDriveInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateWithoutDriveInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUncheckedUpdateManyWithoutDriveInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    transcodeStatus?: StringFieldUpdateOperationsInput | string
    transcodeError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriveAccessUpdateWithoutDriveInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDriveAccessNestedInput
  }

  export type DriveAccessUncheckedUpdateWithoutDriveInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriveAccessUncheckedUpdateManyWithoutDriveInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}