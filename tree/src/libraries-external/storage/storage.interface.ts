export default interface IStorage {
  set(key: string, data: string): Promise<void>
  get(key: string): Promise<string | null | undefined>
}
